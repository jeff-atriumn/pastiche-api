import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.overlaysTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      overlayId: uuid.v1(),
      overlayName: data.overlayName,
      overlayUrl: data.overlayUrl,
      active: data.active,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
});
