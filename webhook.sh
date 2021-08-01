#! /bin/sh
touch .env
source ./.env
VERSION=$(git describe --always)
message="success Deploy $VERSION"
[[ "$1" == "false" ]] && message="failed Deployed $VERSION"
content='{"username": "github-actions", "content":"'$message'"}'

curl -H "Content-Type: application/json" \
-d "$content" \
https://discord.com/api/webhooks/$WEBHOOK_ID/$WEBHOOK_TOKEN