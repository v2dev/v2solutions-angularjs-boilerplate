#!/bin/bash

# Check if DeleteMarkers[] is present
echo "Starting delete script"

if aws s3api list-object-versions --bucket v2-angularjs-boilerplate --query 'DeleteMarkers' >/dev/null 2>&1; then
    echo "DeleteMarkers[] found, executing delete-objects for DeleteMarkers"
    aws s3api delete-objects --bucket v2-angularjs-boilerplate --delete "$(aws s3api list-object-versions --bucket v2-angularjs-boilerplate --query='{Objects: DeleteMarkers[].{Key:Key,VersionId:VersionId}}')"
fi

# Check if Versions[] is present
if aws s3api list-object-versions --bucket v2-angularjs-boilerplate --query 'Versions' >/dev/null 2>&1; then
    echo "Versions[] found, executing delete-objects for Versions"
    aws s3api delete-objects --bucket v2-angularjs-boilerplate --delete "$(aws s3api list-object-versions --bucket v2-angularjs-boilerplate --query='{Objects: Versions[].{Key:Key,VersionId:VersionId}}')"
fi