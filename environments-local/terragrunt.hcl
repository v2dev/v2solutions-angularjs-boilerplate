remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket         = "angularjs-boilerplate-terraform-state-1"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "angularjs-boilerplate-lock-table-plural-1"
  }
}

// remote_state{
// 	backend = "local"
// 	generate  = {
// 		path = "backend.tf"
// 		if_exists = "overwrite_terragrunt"
// 	}

// 	config ={
// 		path = "${path_relative_to_include()}/terraform.tfstate"
// 	}
// }

generate "provider"{
	path = "provider.tf"
	if_exists = "overwrite_terragrunt"

	contents = <<EOF

	provider "aws"{
		region = "us-west-2"
		}
	EOF
}