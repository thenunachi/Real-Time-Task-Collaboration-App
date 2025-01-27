
import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:4000');
    setSocket(socketInstance);
    socketInstance.on('message', (data) => {
      setMessage(prevMessage => [...prevMessage, data]);
    })

    return () => {
      socketInstance.disconnect();
    }
  }, [])
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
  }
  const handleToggle = (item) => {
    console.log(item, 'item');
    const updateMessage = message.map((messageItem) => {
      if (messageItem.id === item.id) {
        console.log(messageItem.id === item.id, 'messageItem.id === item.id');
        return {
          ...messageItem,
          completed: !messageItem.completed,
        };
      }
      return messageItem;
    })
    setMessage(updateMessage);
  }

  const handleDelete = (id) => {
    const updatedMessage = message.filter((item) => item.id !== id);
    setMessage(updatedMessage);
  }
  return (
    <div className="App">
      <header className="App-header">
        <textarea
          className='input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='button' type='submit' onClick={handleSubmit} >
          Send
        </button>
        <div>
          {message.map((item, index) => (
            <p key={index}>{item.text}
              <button onClick={() => handleDelete(item.id)}> Remove </button>
              <button onClick={() => handleToggle(item)}> {item.completed ? 'Completed' : 'Uncomplete'} </button>
            </p>
          ))}
        </div>
        <div>
        </div>
      </header>
    </div>
  );
}

export default App;
