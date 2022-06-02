import { CardValue } from '../../../shared/cards';
import { Config, GroupItem } from '../types';

export const setGroupConnectionVote = async (
  UserId: string,
  userId: string,
  vote: CardValue,
  { tableName }: Config
): Promise<Item> =>
  (
    await 
      .update({
        TableName: tableName,
        Key: {
          primaryKey: `userId:${userId}`,
        },
        UpdateExpression: `SET connections.#userId.vote = :vote`,
        ExpressionAttributeNames: {
          '#userId': userId,
        },
        ExpressionAttributeValues: {
          ':vote': vote,
        },
      })
      .promise()
  ).Attributes as Item;
