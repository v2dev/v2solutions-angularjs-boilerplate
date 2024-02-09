terraform {
    source = "../../../infra-modules/s3"
}

include "root"{
    path = find_in_parent_folders()
}

include "env"{
    path = find_in_parent_folders("env.hcl")
    expose = true
    merge_strategy = "no_merge"
}

inputs = {
    env = include.env.locals.env
    bucket_name = "v2-angularjs-boilerplate"
    versioning_enabled = false
}
