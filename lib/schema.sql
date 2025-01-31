-- Create enum for availability status
CREATE TYPE availability_status AS ENUM ('In Stock', 'Sold Out');

-- Create products table
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

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
    tech_spec_pdf
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
    '/docs/products/udm-pro-specs.pdf'
);

-- Create index for common queries
CREATE INDEX idx_products_model ON products(model);
CREATE INDEX idx_products_availability ON products(availability);
