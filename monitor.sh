#!/bin/bash

echo "Starting backend health check..."

BACKEND_URL=$(minikube service devops-el-lb --url -n backend)

if [ -z "$BACKEND_URL" ]; then
  echo "ERROR: Failed to fetch backend service URL"
  exit 1
fi

echo "Backend URL: $BACKEND_URL"
echo "Calling health endpoint: /api/status"

error_count=0

for i in {1..3}; do
  echo "Health check attempt $i..."

  response=$(curl -s -o /dev/null -w '%{http_code}' "$BACKEND_URL/api/status")

  if [ "$response" -ne 200 ]; then
    echo "Attempt $i failed (HTTP $response)"
    ((error_count++))
  else
    echo "Attempt $i succeeded (HTTP 200)"
  fi

  sleep 1
done

echo "Health check summary: $error_count failures out of 3 attempts"

if [ "$error_count" -gt 1 ]; then
  echo "Backend is unhealthy. Initiating rollback..."

  echo "Switching service selector to BLUE deployment"
  kubectl patch svc devops-el-lb \
    -p '{"spec":{"selector":{"color":"blue"}}}' \
    -n backend

  echo "Scaling GREEN deployment to 0 replicas"
  kubectl scale deployment/devops-el-green --replicas=0 -n backend

  echo "Rollback completed successfully"
else
  echo "Backend is healthy. No rollback required"
fi

echo "Health check script finished"
