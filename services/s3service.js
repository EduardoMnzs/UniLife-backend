const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/s3');
const path = require('path');

const uploadToS3 = async (file) => {
  const fileContent = file.buffer;
  const fileExtension = path.extname(file.originalname);
  const fileName = `${Date.now()}${fileExtension}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  const fileUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  return fileUrl;
};

module.exports = { uploadToS3 };