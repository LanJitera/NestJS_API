resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = var.public_key_pair
}

resource "aws_instance" "retool_bastion" {
  ami           = var.ami_id
  instance_type = "t3.micro"

  root_block_device {
    volume_size = 10
  }

  key_name                = "deployer-key"
  vpc_security_group_ids  = var.security_groups
  monitoring              = true
  disable_api_termination = false
  ebs_optimized           = false
  subnet_id               = var.subnets[0]
}
