#? commands to deploy the application
# chmod +x ./scripts/deploy.sh
# ./scripts/deploy.sh "boloforms-sheet-god" "E4R4CD0V3LXX2"
# staging


# BUCKET_NAME="boloforms-sheet-god"
# DISTRIBUTION_ID="E4R4CD0V3LXX2"

BUCKET_NAME=$1
DISTRIBUTION_ID=$2

echo "-- Install --"
# Install dependencies
npm install --production

echo "-- Build --"
# Build
npm run build

echo "-- Deploy --"
# Sync build with our S3 bucket
aws s3 sync build s3://$BUCKET_NAME
# Invalidate cache
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --no-cli-pager