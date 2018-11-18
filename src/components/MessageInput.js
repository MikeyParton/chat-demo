import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 10px;
  border-top: 1px solid grey;
`;

const MessageInputStyled = styled.input`
  border: none;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
  font-size: 16px;
`;

const SendButton = styled.button`
  flex-shrink: 0;
  padding: 10px 15px;
  background-color: #1787FB;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: #F2F2F2;
    color: black;
  }
`;

class MessageInput extends React.Component {
  static defaultProps = {
    message: ''
  }

  handleChange = (e) => {
    const { updateMessageInput, id } = this.props;
    const { value } = e.target;
    updateMessageInput(value, id);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id, addMessageToConversation, message } = this.props;
    addMessageToConversation({ message , id })
  }

  render() {
    const { message, loading } = this.props;
    const disabled = loading || message.length === 0
    return (
      <form disabled={disabled} onSubmit={this.onSubmit}>
        <FooterStyled>
          <MessageInputStyled
            name="message"
            autocomplete="off"
            placeholder="Type a message..."
            onChange={this.handleChange}
            value={message}
          />
          <SendButton disabled={disabled}>Send</SendButton>
        </FooterStyled>
      </form>
    )
  }
}

export default MessageInput;
