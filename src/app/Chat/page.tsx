'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactMarkdown from 'react-markdown';
import { text } from 'stream/consumers';


const themeColors = {
  primary: '#4c51bf', 
  secondary: '#f50057', 
  background: 'linear-gradient(to right, #f472b6, #4c51bf, #f472b6)',
  text: '#333',
  navbar: '#fff',
};

const ChatContainer = styled(Container)({
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff', 
  padding: '16px',
  borderRadius: '12px',
  marginTop: '70px', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
});

const MessagesContainer = styled(Paper)({
  flex: 1,
  padding: '16px',
  overflowY: 'auto',
  marginBottom: '16px',
  backgroundColor: '#fff', 
  borderRadius: '12px',
});

interface MessageProps {
  isUser: boolean;
}

const Message = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<MessageProps>(({ isUser }) => ({
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser ? themeColors.primary : themeColors.secondary,
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '16px',
  maxWidth: '60%',
}));

const InputContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginTop: 'auto',
});

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Hi! How can I assist you today?" },
  ]);
  const [message, setMessage] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessage('');
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    setTimeout(() => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const otherMessages = prevMessages.slice(0, -1);
        return [
          ...otherMessages,
          { ...lastMessage, content: 'This is a simulated response.' },
        ];
      });
    }, 1000);
  };

  const fetchMoreMessages = () => {
    setHasMore(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-500 via-indigo-600 to-pink-500 font-roboto">
      <AppBar position="static" sx={{ backgroundColor: themeColors.navbar}}>
        <Toolbar>
          <Typography variant="h6" sx={{ color: 'black', margin: 'auto' , fontWeight: 'bold' }}>
            ProfInsights
          </Typography>
        </Toolbar>
      </AppBar>
      <ChatContainer>
        <MessagesContainer>
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchMoreMessages}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p className="text-center">No more messages</p>}
            className="flex flex-col space-y-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <Message isUser={msg.role === 'user'}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </Message>
              </div>
            ))}
            <div ref={bottomRef} />
          </InfiniteScroll>
        </MessagesContainer>
        <InputContainer>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{ style: { fontSize: '0.875rem' } }} 
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: themeColors.primary, fontSize: '0.875rem' }} 
            onClick={sendMessage}
          >
            Send
          </Button>
        </InputContainer>
      </ChatContainer>
    </div>
  );
};

export default Chat;
