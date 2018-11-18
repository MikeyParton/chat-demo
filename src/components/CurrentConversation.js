import React from 'react';
import styled from 'styled-components';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList'

const CurrentConversationStyled = styled.div`
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
`;

const ConversationThread = styled.div`
  padding: 10px;
  flex-grow: 1;
  overflow-y: scroll;
`;

const CurrentConversation = (props) => {
  const {
    id,
    addMessageToConversation,
    messages,
    conversation,
    updateMessageInput
  } = props;

  console.log('rendering current conversation');

  return (
    <CurrentConversationStyled>
      <ConversationThread>
        {conversation.messagesLoading
          ? <p>Loading....</p>
          : <MessagesList messages={messages} />
        }
      </ConversationThread>
      <MessageInput
        id={id}
        loading={conversation.messagesLoading}
        message={conversation.messageInput}
        updateMessageInput={updateMessageInput}
        addMessageToConversation={addMessageToConversation}
      />
    </CurrentConversationStyled>
  )
};

export default CurrentConversation
