'use client'
import { useState } from 'react';

interface Message {
  sender: string;
  content: string;
}
export default function Home() {

  const [messages, setMessage] = useState<Message[]>([
    { sender: "June", content: "Hello World" },
    { sender: "Tush", content: "Hello Bbg" },
  ]);

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
          type='submit'>
          Send
        </button>
      </form>
    </div>
  );
}
