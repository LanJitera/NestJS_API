terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "party-booking-app-development/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}