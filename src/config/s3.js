const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIA43YQHWXXNWTUBEXG',
  secretAccessKey:  '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',
  region:  'ap-southeast-2',
});

const s3 = new AWS.S3();

module.exports = s3;