remote_state{
	backend = "local"
	generate  = {
		path = "backend.tf"
		if_exists = "overwrite_terragrunt"
	}

	config ={
		path = "${path_relative_to_include()}/terraform.tfstate"
	}
}

generate "provider"{
	path = "provider.tf"
	if_exists = "overwrite_terragrunt"

	contents = <<EOF

	provider "aws"{
		region = "us-west-2"
		}
	EOF
}

include "env" {
    path = find_in_parent_folders("env.hcl")
    expose = true
    merge_strategy = "no_merge"
}