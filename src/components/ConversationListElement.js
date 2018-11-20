import React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 15px;
`;

const ConversationListElementStyled = styled.div`
  padding: 20px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid grey;

  ${Avatar} {
    margin-right: 10px;
  }

  ${props => props.active && 'background-color: #F2F2F2;'}
`;

const ConversationListElement = pure((props) => {
  const {
    id,
    business,
    lastMessage,
    active,
    selectConversation
  } = props;

  console.log(`rendering list element ${id}`);
  return (
    <ConversationListElementStyled
      onClick={() => selectConversation(id)}
      active={active}
    >
      <Avatar
        alt={business.name}
        src={business.avatar}
      />
      <div>
        <b>{business.name}</b>
        <LinesEllipsis
          text={lastMessage}
          maxLine={1}
        />
      </div>
    </ConversationListElementStyled>
  )
});

export default ConversationListElement;
