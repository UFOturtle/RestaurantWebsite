// Load the SDK for JavaScript
var AWS = require("aws-sdk");
s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const fs = require("fs");
const stream = require("stream");

class RestaurantItemModel {
  constructor(r) {
    // Set the Region
    AWS.config.update({ region: "us-east-1" });
  }

  addItem(file, itemName) {
    const params = {
      Bucket: "cafe-restaurant-data",
      Key: itemName,
      Body: file,
      ACL: "public-read",
    };
    return new Promise(function (resolve, reject) {
      s3.upload(params, function (err, data) {
        if (err) {
          reject(err);
        }
        resolve("File uploaded.");
      });
    });
  }

  getItems() {
    // Create the parameters for calling listObjects
    var bucketParams = {
      Bucket: "cafe-restaurant-data",
    };
    return new Promise(function (resolve, reject) {
      // Call S3 to obtain a list of the objects in the bucket
      s3.listObjects(bucketParams, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.Contents);
        }
      });
    });
  }
}

module.exports.RestaurantItemModel = RestaurantItemModel;
