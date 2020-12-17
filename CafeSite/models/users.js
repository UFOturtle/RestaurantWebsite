AWS = require("aws-sdk");
docClient = new AWS.DynamoDB.DocumentClient();
dynamodb = new AWS.DynamoDB();
const ItemModel = require("./restaurantItem");
const r = new ItemModel.RestaurantItemModel("us-east-1");
class UsersModel {

    constructor(r){
        
        AWS = require("aws-sdk");
        console.log(r);
        AWS.config.update({
            region: r,
        });
    }


    createUsersTable(){

        var params = {
            TableName : "RestaurantUsers",
            KeySchema: [       
                { AttributeName: "username", KeyType: "HASH"},  //Partition key
            ],
            AttributeDefinitions: [       
                { AttributeName: "username", AttributeType: "S" },
                { AttributeName: "password", AttributeType: "S" }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 10, 
                WriteCapacityUnits: 10
            }
        };
            
        dynamodb.createTable(params, function(err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    }

    addUser(username, password){
        var params = {
            TableName:"RestaurantUsers",
            Item:{
                "username": `${username}`,
                "password": `${password}`,
            }
        };
        
        console.log("Adding a new item...");
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
    }

    deleteUser(username) {
        var params = {
            TableName : "RestaurantUsers",
                Key: {
                    "username": username,
                },
        };

        return new Promise(function (resolve, reject) {
            docClient = new AWS.DynamoDB.DocumentClient();
            dynamodb = new AWS.DynamoDB();
            docClient.delete(params, function(err, data) {
                if (err) {
                    reject(err);
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    resolve("Deleted User")
                }
            });

        });
    }

    login(username){
        var params = {
            TableName : "RestaurantUsers",
            KeyConditionExpression: "#usern = :u",
            ExpressionAttributeNames:{
                "#usern": "username"
            },
            ExpressionAttributeValues: {
                ":u": username
            }
        };

        return new Promise(function (resolve, reject) {
            docClient = new AWS.DynamoDB.DocumentClient();
            dynamodb = new AWS.DynamoDB();
            docClient.query(params, function(err, data) {
                if (err) {
                    reject(err);
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    //console.log(data.Items[0].password);
                    resolve(data.Items[0].password.toString());

                }
            });

        });
        
    }

    checkUser (username) {
        var params = {
            TableName : "RestaurantUsers",
            KeyConditionExpression: "#usern = :u",
            ExpressionAttributeNames:{
                "#usern": "username"
            },
            ExpressionAttributeValues: {
                ":u": username
            }
        };
        
        return new Promise(function (resolve, reject) {
            docClient = new AWS.DynamoDB.DocumentClient();
            dynamodb = new AWS.DynamoDB();
            docClient.query(params, function(err, data) {
                if (err) {
                    reject(err);
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Data items: " + data.Count)
                    resolve(data.Count != 0)
                }
            });

        });
            
        
    }

    addItem(file, fileName, itemName) {
        r.addItem(file, fileName);
        var params = {
            TableName:"RestaurantItems",
            Item:{
                "itemName": `${itemName}`,
                "fileName": `${fileName}`,
            }
        };
        
        console.log("Adding a new item...");
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
    }

}


module.exports.UsersModel = UsersModel;
