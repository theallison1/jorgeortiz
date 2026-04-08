
# 1. Definir el proveedor y la región
provider "aws" {
  region = "us-east-1" # Podés cambiarla a us-east-2 si preferís Ohio
}

# 2. Crear el Bucket de S3 para el hosting
resource "aws_s3_bucket" "website_bucket" {
  bucket = "catalogo-jorge-ortiz-mendoza-2026" # Debe ser un nombre único global
}

# 3. Configurar el bucket para que funcione como Website
resource "aws_s3_bucket_website_configuration" "hosting" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html" # En React, el error suele redirigir al index para manejar rutas
  }
}

# 4. Quitar el bloqueo de acceso público (necesario para que el mundo vea tu web)
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 5. Política para permitir que cualquiera lea los archivos
resource "aws_s3_bucket_policy" "allow_public_access" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
      },
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.public_access]
}

# 6. Salida: La URL para ver tu página
output "website_url" {
  value = aws_s3_bucket_website_configuration.hosting.website_endpoint
}
