import React, { Component } from 'react';
import styled from 'styled-components';
import ConversationList from './components/ConversationList';
import CurrentConversation from './components/CurrentConversation';
import { getConversations, getMessages } from './api';
import { createNewMessage } from './data';

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

class App extends Component {
  state = {
    conversationsLoading: true,
    messagesLoading: false,
    currentConversationId: null,
    conversationsById: {},
    conversationIds: [],
    messagesById: {}
  }

  componentDidMount() {
    this.getConversations();
  }

  // Promisified setState to allow for use with async/await
  syncronousSetState = (args = {}) => {
    return new Promise ((resolve, reject) => {
      this.setState(args, () => {
        resolve();
      })
    })
  }

  selectConversation = (currentConversationId) => {
    this.setState({ currentConversationId });

    const { conversationsById } = this.state;

    // Get messages if we haven't already
    if (!conversationsById[currentConversationId].messageIds) {
      this.getMessages(currentConversationId);
    }
  }

  updateMessageInput = (message, conversationId) => {
    this.setState((state, props) => {
      const { conversationsById } = state;

      return {
        conversationsById: {
          ...conversationsById,
          [conversationId]: {
            ...conversationsById[conversationId],
            messageInput: message
          }
        }
      };
    })
  }

  getConversations = async () => {
    const conversations = await getConversations();
    this.setState({ ...conversations, conversationsLoading: false });
  }

  getMessages = async (conversationId) => {
    // First set messagesLoading state on the conversation
    await this.syncronousSetState((state, props) => {
      const { conversationsById } = state;
      const conversation = conversationsById[conversationId];

      return {
        conversationsById: {
          ...conversationsById,
          [conversationId]: {
            ...conversation,
            messagesLoading: true
          }
        }
      };
    })

    // Get the messages
    const { messagesById, messageIds } = await getMessages(conversationId);

    // Update state with the new messages
    this.setState((state, props) => {
      const { conversationsById, messagesById: oldMessagesById } = state;
      const conversation = conversationsById[conversationId];

      // Add messages to Message store
      const newMessagesById = {
        ...oldMessagesById,
        ...messagesById
      };

      // Add message ids to conversation and remove the messagesLoading state
      const newConversationsById = {
        ...conversationsById,
        [conversationId]: {
          ...conversation,
          messagesLoading: false,
          messageIds
        }
      };

      return {
        messagesById: newMessagesById,
        conversationsById: newConversationsById
      }
    });
  }

  addMessageToConversation = ({ message, id }) => {
    const newMessage = createNewMessage(message);

    this.setState((state, props) => {
      const { messagesById, conversationsById, conversationIds } = state;

      // Add message to Message store
      const newMessagesById = {
        ...messagesById,
        [newMessage.id]: newMessage
      }

      // Add message id to conversation
      const newConversationsById = {
        ...conversationsById,
        [id]: {
          ...conversationsById[id],
          lastMessageTruncated: message,
          messageInput: '',
          messageIds: [
            ...((conversationsById[id] && conversationsById[id].messageIds) || []),
            newMessage.id
          ]
        }
      }

      // Reorder conversations, so that latest message is first
      const newConversationIds = [
        id,
        ...conversationIds.filter(conversationId => conversationId !== id)
      ]

      return {
        messagesById: newMessagesById,
        conversationsById: newConversationsById,
        conversationIds: newConversationIds
      }
    })
  }

  render() {
    const {
      conversationsLoading,
      conversationIds,
      conversationsById,
      currentConversationId,
      messagesById
    } = this.state;

    const conversations = conversationIds.map(id => conversationsById[id]);
    const currentConversation = conversationsById[currentConversationId];
    let messages = [];

    if (currentConversation && currentConversation.messageIds) {
      messages = currentConversation.messageIds.map(id => messagesById[id]);
    }

    return (
      <Page>
        <ConversationList
          loading={conversationsLoading}
          selectConversation={this.selectConversation}
          currentConversationId={currentConversationId}
          conversations={conversations}
        />
        {currentConversation && (
          <CurrentConversation
            id={currentConversationId}
            updateMessageInput={this.updateMessageInput}
            addMessageToConversation={this.addMessageToConversation}
            conversation={currentConversation}
            messages={messages}
          />
        )}
      </Page>
    );
  }
}

export default App;
