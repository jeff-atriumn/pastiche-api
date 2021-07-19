import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      portraitId: event.pathParameters.id, // The id of the portrait from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      "SET portrait = :portrait, overlayId = :overlayId, latitude = :latitude, longitude = :longitude, altitude = :altitude",
    ExpressionAttributeValues: {
      ":portrait": data.image || null,
      ":overlayId": data.overlayId || null,
      ":latitude": data.lat || null,
      ":longitude": data.long || null,
      ":altitude": data.alt || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
