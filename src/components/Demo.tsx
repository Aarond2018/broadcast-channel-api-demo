'use client';

import { useEffect, useState } from 'react';

export default function Demo() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    // Create a new broadcast channel named 'test_bc'
    const channel = new BroadcastChannel('test_bc');

    // Listen for messages from other tabs
    channel.onmessage = (event) => {
      setReceivedMessage(event.data);
    };

    // Clean up by closing the channel when the component unmounts
    return () => {
      channel.close();
    };
  }, []);

  // Function to send a message
  const sendMessage = () => {
    const channel = new BroadcastChannel('test_bc');
    channel.postMessage(message);
  };

  return (
    <div>
      <h2>Broadcast Channel API Demo</h2>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className='border mr-4'
      />
      <button onClick={sendMessage}>Send Message</button>

      {receivedMessage && (
        <p>
          <span className='font-semibold'>Received message:</span> {receivedMessage}
        </p>
      )}
    </div>
  );
}
