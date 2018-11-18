import React from 'react';
import Message from './Message';
import styled from 'styled-components';

const NoMessage = styled.div`
  display: flex;
  justify-content: center;
`

const MessagesList = (props) => {
    const { messages } = props;
    if (messages.length === 0) {
      return (
        <NoMessage>
          <p>This is the beginning of your conversation.</p>
        </NoMessage>
      )
    }
    return messages.map(message => (
      <Message
        key={message.id}
        {...message}
      />
    ))
}

export default MessagesList;
