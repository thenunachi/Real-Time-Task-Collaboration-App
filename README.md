# Real-Time-Task-Collaboration-App

View Demo at taskAppView.gif file.

A Real-Time Task Collaboration App built with React and Socket.IO
Install dependencies: npm install
npm install socket.io
npm install cors
npm install express

Start the app: node server.js

Open the app: http://localhost:4000

This app is a simple Real-Time Task Collaboration App built with React and Socket.IO. It allows users to create and manage tasks in real-time across multiple devices.


The app has the following features:

1. ##Create a new task: Users can create new tasks by typing in the input field and clicking the "Add Task" button.
2. ##Delete a task: Users can delete a task by clicking the "Delete" button next to the task.
3. ##Toggle a task: Users can toggle a task by clicking the checkbox next to the task.
4. ##Real-time updates: The app uses Socket.IO to update the tasks in real-time across multiple devices.
5. ##CORS: The app uses CORS to allow cross-origin requests from the client side.


#Client-side (React):
The App.js file contains a simple UI with a text area to input messages, a button to send them, and a list displaying the messages. It uses useState to manage the input, message list, and message completion toggle. The handleSubmit function adds messages to the list, and handleToggle toggles the completion state.

#Server-side (Node.js with Express and Socket.io):
1.The server.js file sets up an Express server wrapped in HTTP and connected to Socket.io. It listens for client connections and logs a message when a user connects. Persistence using Database is not implemented, so data is lost when server is restarted.

2.It enables Cross-Origin Resource Sharing (CORS) for communication between a React frontend (running on http://localhost:3000) and the backend. When a user connects, their socket ID is logged, and any incoming messages are broadcast to all connected clients. The server listens on port 4000, and it also logs when a user disconnects. The Socket.io server listens for "message" events and emits the data to all connected clients.

3.Created separate socket.io connection for the delete, toggle and initialMessages events. initialMessages event is emitted to all connected clients when a new connection is established. deleteMessage and toggleMessage events are emitted to all connected clients when a user sends them.