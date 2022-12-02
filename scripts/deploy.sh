USERNAME=$(cat ./auth.json | jq -r '.username')
PASSWORD=$(cat ./auth.json | jq -r '.password')
DOMAIN=$(cat ./auth.json | jq -r '.domain')
echo "⏫ deploying ==================="
node ./node_modules/@kintone/customize-uploader/bin/cli manifest.json --domain $DOMAIN --username $USERNAME --password $PASSWORD
echo "✅ deployed  ==================="