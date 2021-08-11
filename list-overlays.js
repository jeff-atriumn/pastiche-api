import handler from "./libs/handler-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.OVERLAYS_TABLE_NAME,
    IndexName: "active-index",
    KeyConditionExpression: "active = :active",
    ExpressionAttributeValues: {
      ":active": "true",
    },
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
});
