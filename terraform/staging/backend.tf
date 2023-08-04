terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "party-booking-app-staging/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}