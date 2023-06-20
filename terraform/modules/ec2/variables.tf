variable "security_groups" {
  description = "A list of security group ids for ec2"
  default     = []
}

variable "subnets" {
  description = "Ids of the subnets"
  default     = []
}

variable "public_key_pair" {
  description = "Public key pair to SSH"
  default     = ""
}

variable "ami_id" {
  description = "An AMI id for re-use"
}
