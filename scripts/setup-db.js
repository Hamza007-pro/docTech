const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DATABASE,
    ssl: process.env.POSTGRES_SSL === 'true' ? {
      rejectUnauthorized: false
    } : undefined
  });

  try {
    // Drop existing tables and types if they exist
    console.log('Cleaning up existing database objects...');
    await pool.query(`
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
      DROP TYPE IF EXISTS availability_status CASCADE;
    `);

    // Define schema
    const schema = `
      -- Create enum for availability status
      CREATE TYPE availability_status AS ENUM ('In Stock', 'Sold Out');

      -- Create categories table first
      CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          slug VARCHAR(50) NOT NULL UNIQUE,
          description TEXT,
          parent_id INTEGER REFERENCES categories(id),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create products table with correct foreign keys
      CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          model VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          availability availability_status NOT NULL DEFAULT 'In Stock',
          image_src TEXT NOT NULL,
          img_full TEXT NOT NULL,
          image_alt VARCHAR(255) NOT NULL,
          is_new BOOLEAN DEFAULT false,
          clients VARCHAR(50),
          features TEXT[] DEFAULT '{}',
          tech_spec_pdf TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          category_id INTEGER REFERENCES categories(id),
          subcategory_id INTEGER REFERENCES categories(id)
      );

      -- Create a trigger to automatically update the updated_at timestamp
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- Add triggers for both tables
      CREATE TRIGGER update_products_updated_at
          BEFORE UPDATE ON products
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();

      CREATE TRIGGER update_categories_updated_at
          BEFORE UPDATE ON categories
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();

      -- Create indexes for common queries
      CREATE INDEX idx_products_model ON products(model);
      CREATE INDEX idx_products_availability ON products(availability);
      CREATE INDEX idx_products_category_id ON products(category_id);
      CREATE INDEX idx_products_subcategory_id ON products(subcategory_id);

      -- Insert all categories
      INSERT INTO categories (name, slug, description) VALUES
          ('WiFi', 'wifi', 'Wireless networking and connectivity solutions'),
          ('Switching', 'switching', 'Network switching and routing equipment'),
          ('Cloud Gateways', 'cloud-gateways', 'Cloud-based network gateway solutions'),
          ('Camera Security', 'camera-security', 'Security and surveillance camera systems'),
          ('Door Access', 'door-access', 'Access control and door security systems'),
          ('Integrations', 'integrations', 'System integration and compatibility solutions'),
          ('Advanced Hosting', 'advanced-hosting', 'Advanced hosting and server solutions'),
          ('VoIP', 'voip', 'Voice over IP communication systems'),
          ('Accessories', 'accessories', 'Additional accessories and components');

      -- Insert sample product
      INSERT INTO products (
          title,
          model,
          description,
          price,
          availability,
          image_src,
          img_full,
          image_alt,
          is_new,
          clients,
          features,
          tech_spec_pdf,
          category_id,
          subcategory_id
      ) VALUES (
          'Dream Machine Pro',
          'UDM-Pro',
          'Enterprise-grade, rack-mount UniFi Cloud Gateway with full UniFi application support, 10 Gbps performance, and an integrated switch.',
          379.00,
          'In Stock',
          '/images/products/download.png',
          '/images/products/full/949fdb99-c8cb-4dae-8097-943f59eced8d.png',
          'Dream Machine Pro',
          true,
          '5,000',
          ARRAY['NeXT AI Cybersecurity'],
          '/docs/products/udm-pro-specs.pdf',
          (SELECT id FROM categories WHERE slug = 'cloud-gateways'),
          NULL
      );
    `;

    // Execute the schema
    console.log('Creating database tables...');
    await pool.query(schema);
    console.log('Database tables created successfully!');

  } catch (error) {
    console.error('Error setting up database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
