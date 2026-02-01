#!/bin/bash
BACKEND_URL=$(minikube service devops-el-lb --url -n backend)
error_count=0
for i in {1..3}; do
  response=$(curl -s -o /dev/null -w '%{http_code}' $BACKEND_URL/api/status)
  if [ $response -ne 200 ]; then
    ((error_count++))
  fi
  sleep 1
done
if [ $error_count -gt 1 ]; then
  kubectl patch svc devops-el-lb -p '{"spec":{"selector":{"color":"blue"}}}' -n backend
  kubectl scale deployment/devops-el-green --replicas=0 -n backend
fi
