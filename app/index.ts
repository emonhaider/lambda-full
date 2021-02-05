import * as axios from "axios";
// const axios = require('axios');
// Handler
exports.handler = async function (event: any, context: any) {
  console.log("## ENVIRONMENT VARIABLES: " + JSON.stringify(process.env));
  console.log("## CONTEXT: " + JSON.stringify(context));
  console.log("## EVENT: " + JSON.stringify(event));
  var response = await axios.default.get(
    "https://api.github.com/users/emonhaider"
  );
  return formatResponse(response.data);
};

var formatResponse = function (body: any) {
  var response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    multiValueHeaders: {
      "X-Custom-Header": ["My value", "My other value"],
    },
    body: JSON.stringify(body),
  };
  return response;
};
