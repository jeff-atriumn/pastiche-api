import handler from "./libs/handler-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = handler(async (event, context) => {
  console.log(event);
  const params = {
    TableName: process.env.tableName,
    IndexName: "overlayId-index",
    KeyConditionExpression: "overlayId = :overlayId",
    ExpressionAttributeValues: {
      ":overlayId": event.pathParameters.overlay,
    },
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
});
