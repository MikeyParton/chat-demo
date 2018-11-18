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

  selectConversation = (currentConversationId) => {
    const { conversationsById } = this.state;

    this.setState({ currentConversationId });

    // Get messages if we haven't already
    if (!conversationsById[currentConversationId].messageIds) {
      this.getMessages(currentConversationId);
    }
  }

  updateMessageInput = (message, conversationId) => {
    const { conversationsById } = this.state;
    this.setState({
      conversationsById: {
        ...conversationsById,
        [conversationId]: {
          ...conversationsById[conversationId],
          messageInput: message
        }
      }
    })
  }

  getConversations = async () => {
    const conversations = await getConversations();
    this.setState({ ...conversations, conversationsLoading: false });
  }

  getMessages = async (conversationId) => {
    let { conversationsById, messagesById: oldMessagesById } = this.state;
    const conversation = conversationsById[conversationId];

    this.setState({
      conversationsById: {
        ...conversationsById,
        [conversationId]: {
          ...conversation,
          messagesLoading: true
        }
      }
    })

    const { messagesById, messageIds } = await getMessages(conversationId);
    ({ conversationsById, messagesById: oldMessagesById } = this.state);

    // Add messages to Message store
    const newMessagesById = {
      ...oldMessagesById,
      ...messagesById
    };

    // Add message ids to conversation
    const newConversationsById = {
      ...conversationsById,
      [conversationId]: {
        ...conversation,
        messagesLoading: false,
        messageIds
      }
    };

    this.setState({
      messagesById: newMessagesById,
      conversationsById: newConversationsById
    });
  }

  addMessageToConversation = ({ message, id }) => {
    const { messagesById, conversationsById } = this.state;
    const newMessage = createNewMessage(message);

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

    this.setState({
      messagesById: newMessagesById,
      conversationsById: newConversationsById
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
