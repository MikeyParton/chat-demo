import React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';
import ConversationListElement from './ConversationListElement';

const ConversationListStyled = styled.div`
  flex-basis: 30%;
  border-right: 1px solid grey;
  max-height: 100%;
  overflow-y: scroll;
`;

const ConversationList = pure((props) => {
  console.log('rendering conversation list')

  const {
    conversations,
    currentConversationId,
    selectConversation,
    loading
  } = props;

  return (
    <ConversationListStyled>
      {loading && <p>Loading...</p>}
      {conversations.map(conversation => (
        <ConversationListElement
          key={conversation.id}
          id={conversation.id}
          business={conversation.business}
          lastMessage={conversation.lastMessageTruncated}
          active={currentConversationId === conversation.id}
          selectConversation={selectConversation}
        />
      ))}
    </ConversationListStyled>
  )
})

export default ConversationList;
