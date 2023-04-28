import Chat from './components/Chat';
import './assets/index.scss';
import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';

function App() {

  return (
    <StompSessionProvider
      url={`ws://${window.location.host}/chat`}>
      <div className='root'>
        <div className='container'>
          <Chat />
        </div>
      </div>
    </StompSessionProvider>
  );
}

export default App;
