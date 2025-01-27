
import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:4000');
    setSocket(socketInstance);

    socketInstance.on('initialMessages', (data) => {
      // console.log(data, 'data');
      setMessages(data);
    })
    socketInstance.on('messageResponse', (data) => {
      // console.log(data, 'data');
      setMessages(data);
    })

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  const handleSubmit = () => {
    if (socket && input.trim()) {
      socket.emit('message', {

        id: Date.now(),
        text: input,
        completed: false,
        timestamp: Date.now(),
        socketId: socket.id
      });
      setInput('');
    }
    // console.log(messages, 'message');
  }

  const handleToggle = (id) => {
    // console.log(id, "toggle id")
    socket.emit('toggleMessage', id);
    // console.log(messages, "message toggle")
  }

  const handleDelete = (id) => {
    socket.emit('deleteMessage', id);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Time Task Collaboration App</h1>
        <textarea
          placeholder='Enter your message'
          className='input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>Add Task</Button>

        {messages.length > 0 &&
          (<div className='messages'>
            {messages.map((item, index) => (
              <div className='message' key={index}>
                <DeleteIcon className='delete-icon' variant="contained" onClick={() => handleDelete(item.id)} />
                {item.completed ? <s>{item.text}</s> : item.text}
                <Checkbox defaultChecked={item.completed} onClick={() => handleToggle(item.id)} />
              </div>
            ))}
          </div>)
        }
        <div>
        </div>
      </header >
    </div >
  );
}

export default App;
