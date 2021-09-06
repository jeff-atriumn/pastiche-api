import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      portraitId: uuid.v1(),
      overlayId: data.overlayId,
      portrait: data.image,
      latitude: data.lat,
      longitude: data.long,
      altitude: data.alt,
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
