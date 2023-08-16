terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "party-booking-app-production/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}