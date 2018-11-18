import { normalize, schema } from 'normalizr';
import { conversations, messages } from './data';

const conversationSchema = new schema.Entity('conversations');
const conversationListSchema = [ conversationSchema ];

const messageSchema = new schema.Entity('messages');
const messageListSchema = [ messageSchema ];

export const getConversations = async () => {
  const response = await simulateAsyncData(conversations);
  const nomralizedResponse = normalize(response, conversationListSchema);
  return {
    conversationsById: nomralizedResponse.entities.conversations,
    conversationIds: nomralizedResponse.result,
  }
};

export const getMessages = async (conversationId) => {
  const response = await simulateAsyncData(messages[conversationId] || []);
  const nomralizedResponse = normalize(response, messageListSchema);
  return {
    messagesById: nomralizedResponse.entities.messages,
    messageIds: nomralizedResponse.result,
  }
};

const simulateAsyncData = (data, ms = 2000) => new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve(data);
  }, ms);
});
