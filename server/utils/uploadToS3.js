import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const uploadFile = async (file) => {
    const key = file.originalname + Date.now();

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `product-images/${key}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        await client.send(command);
        return `https://mkart.s3.ap-south-1.amazonaws.com/product-images/${key}`
    } catch (err) {
        console.error(err);
    }
}

const uploadPdf = async (file, fileName, userId) => {
    const key = fileName;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `order-invoice/${userId}/${key}`,
        Body: file,
        ContentType: 'application/pdf',
    });

    try {
        await client.send(command);
    } catch (err) {
        console.error(err);
    }
}

export { uploadFile, uploadPdf };
