
output "alb_sg_id" {
  description = "ID of the security group for application load balancer"
  value       = aws_security_group.web_lb.id
}

output "app_sg_id" {
  description = "ID of the security group for app servers"
  value       = aws_security_group.web_app.id
}

output "database_sg_id" {
  description = "ID of the security group for database (RDS)"
  value       = aws_security_group.web_db.id
}

output "codebuild_sg_id" {
  description = "ID of the security group for codebuild"
  value       = aws_security_group.codebuild.id
}

output "redis_security_group_id" {
  description = "ID of the security group for codebuild"
  value       = aws_security_group.web_redis.id
}

output "ec2_retool_bastion_sg_id" {
  description = "ID of the security group for ec2 retool bastion servers"
  value       = aws_security_group.ec2_retool_bastion.id
}
