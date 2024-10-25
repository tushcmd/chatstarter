'use client'
import { Authenticated, useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { api } from '../../convex/_generated/api';



export default function Home() {

  const messages = useQuery(api.functions.message.list);

  const createMessage = useMutation(api.functions.message.create);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMessage({ sender: "Jack", content: input });
    setInput("");
  }
  return (
    <Authenticated>
      <div>
        {messages?.map((message, index) => (
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
    </Authenticated>
  );
}
