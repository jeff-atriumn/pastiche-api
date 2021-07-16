import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
        // The attributes of the item to be created
        userId: "123", // The id of the author
        imageId: uuid.v1(), // A unique uuid
        image: data.image, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
      },
    };

  await dynamoDb.put(params);

  return params.Item;
});