import React from 'react';
import styled from 'styled-components';
import { pure } from 'recompose';

const Row = styled.div`
  display: flex;
  ${props => props.for_me && `justify-content: flex-end;`}
`;

const MessageStyled = styled.div`
  max-width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: ${props => props.for_me ? '#1787FB' : '#F2F2F2'};
  color: ${props => props.for_me ? 'white' : 'black'};
  border-radius: 5px;
`;

const Message = pure((props) => {
  const { message, for_me, id } = props;
  console.log(`rendering message ${id}`);
  return (
    <Row for_me={for_me}>
      <MessageStyled for_me={for_me}>
        {message}
      </MessageStyled>
    </Row>
  )
});

export default Message;
