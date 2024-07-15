import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';

function Messages(props) {
    let messageEnd = createRef();
    let messagesContainer = createRef();
    const { messages } = props;

    const scrollToBottom = () => {
        if (!messagesContainer.current || !messageEnd.current) return;
        messageEnd.current.scrollIntoView();
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <MessagesContainer ref={messagesContainer}>
            {messages.map((message, index) => (
                <Message user={message.from} key={`${message.id}-${index}`}>
                    {message.text}
                </Message>
            ))}
            <div className='dummy' ref={messageEnd}></div>
        </MessagesContainer>
    );
}

const Message = (props) => {
    return props.user !== null ? (
        <MessageContainer className={props.className}>
            <UserContainer>
                <User>{props.user}</User>
            </UserContainer>
            <Text>{props.children}</Text>
        </MessageContainer>
    ) : (
        <MessageContainer adminMessage className={props.className}>
            <Text adminMessage>{props.children}</Text>
        </MessageContainer>
    );
};

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.9em;
    margin-bottom: 10px;
    box-sizing: border-box;

    ${({ adminMessage }) =>
        adminMessage && { textAlign: 'center', color: 'gray' }}
`;

const UserContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const User = styled.div`
    border: 1.5px solid pink;
    border-radius: 10px;
    padding: 3px 10px;
    font-weight: 500;
    font-size: 0.85em;
    margin-bottom: 3px;
`;

const Text = styled.div`
    padding: 8px 10px;
    font-weight: 500;
    font-size: 0.9em;
    flex-wrap: wrap;
    background-color: ${(props) => (props.adminMessage ? 'transparent' : '#eee')};
    border-radius: 15px;
    overflow-wrap: break-word; 
`;

export default Messages;
