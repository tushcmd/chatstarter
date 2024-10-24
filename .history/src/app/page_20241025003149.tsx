'use client'
import { useState } from 'react';

interface Message {
  sender: string;
  content: string;
}
export default function Home() {

  const [messages, setMessage] = useState<Message[]>([
    { sender: "Jack", content: "Hello World" },
    { sender: "Alice", content: "Hello There" },
  ]);

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

      <form>
        <input
          type="text"
          name="message"
          id='message'
        />
        <button
          type='submit'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Send
        </button>
      </form>
    </div>
  );
}
