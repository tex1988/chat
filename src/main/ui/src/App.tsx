import Chat from './components/Chat';
import './assets/index.scss';
import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';

function App() {
  function getWsProtocol(): string {
    return location.protocol === 'https:' ? 'wss:' : 'ws:';
  }

  return (
    <StompSessionProvider url={`${getWsProtocol()}//${window.location.host}/chat`}>
      <div className="container">
        <Chat />
      </div>
    </StompSessionProvider>
  );
}

export default App;
