
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const handleSubmit = () => {
    if (input.trim()) {
      setMessage([...message, input]);
      setInput('');
    }
  }
  const handleToggle = () => {
    setIsToggle(!isToggle);
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
            <p key={index}>{item}
              <button> Remove </button>
              <button onClick={handleToggle}> {isToggle ? 'completed' : 'not completed'} </button>
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
