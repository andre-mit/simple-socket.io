import React, { useEffect, useState, FormEvent } from 'react';
import socketIOClient from 'socket.io-client';


interface Message {
  user: string;
  message: string;
}
const serverURL = 'http://localhost:3333';
const socket = socketIOClient(serverURL);
function App() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message>({ user: '', message: '' });

  socket.on('previousMessages', (messages: Message[]) => {
    setMessages(messages);
  });

  socket.on('receivedMessage', (message: Message) => {
    setMessages([...messages, message]);
  });

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    if (newMessage) {
      setMessages([...messages, newMessage]);
      socket.emit('sendMessage', newMessage);
      setNewMessage({ user: '', message: '' });
    }
  }
  return (
    <>

      {
        messages.map(message => (
          <>
            <strong>{message.user}</strong>
            <p>{message.message}</p><br /><br />
          </>
        ))
      }
      <br /><br />
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage.user}
          onChange={e => setNewMessage({ ...newMessage, user: e.target.value })}
          placeholder="Seu Nome"
        />
        <input
          type="text"
          value={newMessage.message}
          onChange={e => setNewMessage({ ...newMessage, message: e.target.value })}
          placeholder="Mensagem"
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
