'use client'
import { useState } from 'react';

interface Message {
  sender: string;
  content: string;
}
export default function Home() {

  const [messages, setMessages] = useState<Message[]>([
    { sender: "Jack", content: "Hello World" },
    { sender: "Alice", content: "Hello There" },
  ]);

  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages([...messages, { sender: "Jack", content: input }]);
    setInput("");
  }
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.sender}</strong>: {message.content}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id='message'
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          type='submit'
          className=""
        >
          Send
        </button>
      </form>
    </div>
  );
}