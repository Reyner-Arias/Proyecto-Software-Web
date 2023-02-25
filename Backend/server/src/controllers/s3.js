require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require("fs")


const accessKeyId = process.env.S3_BUCKET_KEY
const secretAccessKey = process.env.S3_BUCKET_SECRET
const region = process.env.S3_BUCKET_REGION
const bucket = process.env.S3_BUCKET_NAME

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function subirArchivo(archivo) {
  let fileStream = fs.createReadStream(archivo.path)
  const params = {
    Bucket: bucket, 
    Key: archivo.filename, 
    Body: fileStream
  }
  return s3.upload(params).promise()
}
exports.subirArchivo = subirArchivo

function obtenerArchivo(idArchivo) {
  const params = {
      Bucket: bucket,
      Key: idArchivo,
  }
  let fileStream = s3.getObject(params).createReadStream()
  return fileStream
}
exports.obtenerArchivo = obtenerArchivo