    // Load the SDK for JavaScript
    var AWS = require('aws-sdk');
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    const fs = require('fs');
    const stream = require('stream');

    class RestaurantItemModel {
        constructor(r){
            // Set the Region 
            AWS.config.update({region: 'us-east-2'});
        }

        addItem(file, itemName) {
           const params = {
               Bucket: "cafe-restaurant-data",
               Key: itemName,
               Body: file
           };
           return new Promise(function (resolve, reject) {
                s3.upload(params, function(err, data){
                    if(err) {
                        reject(err);
                    }
                    resolve("File uploaded.");
                });
           });
        
        }

        getItems() {
            
        }
    }

    module.exports.RestaurantItemModel = RestaurantItemModel;