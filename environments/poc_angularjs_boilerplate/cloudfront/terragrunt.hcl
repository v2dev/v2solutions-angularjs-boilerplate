terraform {
    source = "../../../infra-modules/cloudfront"
}

include "root"{
    path = find_in_parent_folders()
}

// include "env"{
//     path = find_in_parent_folders("env.hcl")
//     expose = true
//     merge_strategy = "no_merge"
// }

inputs = {
    env = dependency.env.locals.env
    // env = include.env.locals.env
    bucket_name = dependency.s3.outputs.s3_bucket_name
}

dependency "s3"{
	config_path = "../s3"

	mock_outputs ={
	    s3_bucket_name = "my-test-bucket"
	}
}
