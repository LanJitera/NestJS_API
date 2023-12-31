
module "access_log_s3_bucket" {
  source                         = "terraform-aws-modules/s3-bucket/aws"
  version                        = "3.5.0"
  bucket                         = var.access_log_name
  acl                            = "log-delivery-write"
  force_destroy                  = true
  attach_elb_log_delivery_policy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]
}

module "pipeline_artifact_s3_bucket" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.pipeline_artifact_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]
}

module "vpc_flow_s3_bucket" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.vpc_flow_log_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]
}

module "cloudwatch_log_groups" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.cloudwatch_log_group_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  attach_policy = true
  policy        = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Principal": {
            "Service": "logs.ap-northeast-1.amazonaws.com"
        },
        "Action": "s3:GetBucketAcl",
        "Resource": "arn:aws:s3:::${var.cloudwatch_log_group_name}"
    },
    {
        "Effect": "Allow",
        "Principal": {
            "Service": "logs.ap-northeast-1.amazonaws.com"
        },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::${var.cloudwatch_log_group_name}/*",
        "Condition": {
            "StringEquals": {
                "s3:x-amz-acl": "bucket-owner-full-control"
            }
        }
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "exec_ssh" {
  bucket = var.ecs_exec_bucket_name
  acl    = "private"

  versioning {
    enabled = true
  }

  tags = {
    Terraform = "true"
  }
  lifecycle_rule {
    id      = "log"
    enabled = true
    tags = {
      rule      = "log"
      autoclean = "true"
    }
    expiration {
      days = 365
    }
  }
}

# CloudTrail
module "cloutrail_bucket" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.cloudtrail_bucket_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]

  attach_policy = true
  policy        = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AWSCloudTrailAclCheck",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::${var.cloudtrail_bucket_name}"
        },
        {
            "Sid": "AWSCloudTrailWrite",
            "Effect": "Allow",
            "Principal": {
              "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::${var.cloudtrail_bucket_name}/AWSLogs/${var.aws_account_id}/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
EOF
}

module "athena_output_s3_bucket" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.athena_output_bucket_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]
}

# Cloudwatch Exporter
module "rds_bucket_name" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.rds_bucket_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]
  attach_policy = true
  policy        = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
      {
          "Action": "s3:GetBucketAcl",
          "Effect": "Allow",
          "Resource": "arn:aws:s3:::${var.rds_bucket_name}",
          "Principal": { "Service": "logs.ap-northeast-1.amazonaws.com" }
      },
      {
          "Action": "s3:PutObject" ,
          "Effect": "Allow",
          "Resource": "arn:aws:s3:::${var.rds_bucket_name}/*",
          "Condition": { "StringEquals": { "s3:x-amz-acl": "bucket-owner-full-control" } },
          "Principal": { "Service": "logs.ap-northeast-1.amazonaws.com" }
      }
    ]
}
  EOF
}
module "codebuild_bucket_name" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.codebuild_bucket_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]
  attach_policy = true
  policy        = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
      {
          "Action": "s3:GetBucketAcl",
          "Effect": "Allow",
          "Resource": "arn:aws:s3:::${var.codebuild_bucket_name}",
          "Principal": { "Service": "logs.ap-northeast-1.amazonaws.com" }
      },
      {
          "Action": "s3:PutObject" ,
          "Effect": "Allow",
          "Resource": "arn:aws:s3:::${var.codebuild_bucket_name}/*",
          "Condition": { "StringEquals": { "s3:x-amz-acl": "bucket-owner-full-control" } },
          "Principal": { "Service": "logs.ap-northeast-1.amazonaws.com" }
      }
    ]
}
  EOF
}
module "ecs_web_bucket_name" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "3.5.0"
  bucket        = var.ecs_web_bucket_name
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 365
      }
    }
  ]
  attach_policy = true
  policy        = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
      {
          "Action": "s3:GetBucketAcl",
          "Effect": "Allow",
          "Resource": "arn:aws:s3:::${var.ecs_web_bucket_name}",
          "Principal": { "Service": "logs.ap-northeast-1.amazonaws.com" }
      },
      {
          "Action": "s3:PutObject" ,
          "Effect": "Allow",
          "Resource": "arn:aws:s3:::${var.ecs_web_bucket_name}/*",
          "Condition": { "StringEquals": { "s3:x-amz-acl": "bucket-owner-full-control" } },
          "Principal": { "Service": "logs.ap-northeast-1.amazonaws.com" }
      }
    ]
}
  EOF
}

#For S3 bucket related to code
module "s3_bucket" {
  source                  = "terraform-aws-modules/s3-bucket/aws"
  version                 = "3.5.0"
  bucket                  = var.bucket_name
  acl                     = "private"
  force_destroy           = true
  # block_public_acls       = true
  # block_public_policy     = true
  # ignore_public_acls      = true
  # restrict_public_buckets = true

  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  attach_policy = true
  policy        = <<EOF
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid": "Stmt1526330824446",
      "Effect": "Allow",
      "Principal": {
        "AWS": "${var.s3_user_arn}"
      },
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::${var.bucket_name}"

    }
  ]
}
EOF
}

# Waf bucket
module "waf_bucket_delivery" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "v1.20.0"
  bucket        = "aws-waf-logs-${var.name}"
  acl           = "private"
  force_destroy = true
  tags = {
    Terraform = "true"
  }
  versioning = {
    enabled = true
  }
  lifecycle_rule = [
    {
      id      = "log"
      enabled = true

      expiration = {
        days = 90
      }
      noncurrent_version_expiration = {
        days = 30
      }
    }
  ]
}