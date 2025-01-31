# Product Technical Specifications PDFs

This directory contains PDF files for product technical specifications.

## Directory Structure
```
public/
  └── docs/
      └── products/           # Technical specification PDFs
          ├── README.md      # This file
          └── *.pdf          # PDF files
```

## Naming Convention
Name your PDF files using the product model in lowercase with dashes:
- example-product-specs.pdf
- udm-pro-specs.pdf

## Usage
1. Add your PDF files to this directory
2. Update the product in the database with the PDF path:
   ```sql
   UPDATE products 
   SET tech_spec_pdf = '/docs/products/your-product-specs.pdf'
   WHERE model = 'Your-Product';
   ```

## Example
For a product "Dream Machine Pro":
1. Save PDF as: `udm-pro-specs.pdf`
2. Place it in: `public/docs/products/udm-pro-specs.pdf`
3. Update database:
   ```sql
   UPDATE products 
   SET tech_spec_pdf = '/docs/products/udm-pro-specs.pdf'
   WHERE model = 'UDM-Pro';
