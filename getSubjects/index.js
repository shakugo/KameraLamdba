var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1'
});

exports.handler = async (event, context) => {
  const params = {
    TableName: "subject",
    FilterExpression : "available_flag = :val",
    ExpressionAttributeValues : {":val" : true}
  };
  var response = {
    "headers": {},
    "isBase64Encoded": false
  };

  try {
    const data = await dynamo.scan(params).promise();
    response.statusCode = 200;
    response.body = JSON.stringify(data);
  }catch(e){
    console.log(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e);
  }

  return response;
};