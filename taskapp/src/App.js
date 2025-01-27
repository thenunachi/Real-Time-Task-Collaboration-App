
import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


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
        <textarea
          className='input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='button' type='submit' onClick={handleSubmit} >
          Send
        </button>
        <div>
          {messages.map((item, index) => (
            <p key={index}>{item.text}
              <button onClick={() => handleDelete(item.id)}> Remove </button>
              <button onClick={() => handleToggle(item.id)}> {item.completed ? 'Completed' : 'Incomplete'} </button>
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
