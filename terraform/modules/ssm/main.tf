resource "aws_ssm_parameter" "database_password" {
  name  = "/${var.name}/database_password"
  type  = "SecureString"
  value = var.database_password
  lifecycle {
    ignore_changes = [
      value
    ]
  }
}

resource "aws_ssm_parameter" "database_host" {
  name  = "/${var.name}/database_host"
  type  = "SecureString"
  value = var.database_host
}

resource "aws_ssm_parameter" "ecr_image_name" {
  name  = "/${var.name}/ecr_image_name"
  type  = "SecureString"
  value = var.web_container_name
}

resource "aws_ssm_parameter" "rails_master_key" {
  name  = "/${var.name}/rails_master_key"
  type  = "SecureString"
  value = var.rails_master_key
}
resource "aws_ssm_parameter" "docker_username" {
  name  = "/${var.name}/docker_username"
  type  = "SecureString"
  value = var.docker_username
}

resource "aws_ssm_parameter" "docker_password" {
  name  = "/${var.name}/docker_password"
  type  = "SecureString"
  value = var.docker_password
}
resource "aws_ssm_parameter" "subnet" {
  name  = "/${var.name}/subnet"
  type  = "SecureString"
  value = var.subnet
}
resource "aws_ssm_parameter" "security_group" {
  name  = "/${var.name}/security_group"
  type  = "SecureString"
  value = var.security_group
}
resource "aws_ssm_parameter" "redis_address" {
  name  = "/${var.name}/redis_address"
  type  = "SecureString"
  value = var.redis_address
}

resource "aws_ssm_parameter" "git_token" {
  name  = "/${var.name}/git_token"
  type  = "SecureString"
  value = var.git_token
}

resource "aws_ssm_parameter" "ses_secret_key" {
  name  = "/${var.name}/ses_secret_key"
  type  = "SecureString"
  value = var.ses_secret_key
}

resource "aws_ssm_parameter" "ses_api_key" {
  name  = "/${var.name}/ses_api_key"
  type  = "SecureString"
  value = var.ses_api_key
}

resource "aws_ssm_parameter" "ses_region" {
  name  = "/${var.name}/ses_region"
  type  = "SecureString"
  value = var.ses_region
}

resource "aws_ssm_parameter" "rollbar_token" {
  name  = "/${var.name}/rollbar_token"
  type  = "SecureString"
  value = var.rollbar_token
}

resource "aws_ssm_parameter" "s3_secret_key" {
  name  = "/${var.name}/s3_secret_key"
  type  = "SecureString"
  value = var.s3_secret_key
}

resource "aws_ssm_parameter" "s3_api_key" {
  name  = "/${var.name}/s3_api_key"
  type  = "SecureString"
  value = var.s3_api_key
}