import Chat from './components/Chat';
import './assets/index.scss';
import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';

export const ChatContext = React.createContext({});

function App() {


  return (
    <StompSessionProvider
      url={'ws://localhost:8080/chat'}>
      <div className='root'>
        <div className='container'>
          <ChatContext.Provider value={{name: ''}}>
            <Chat />
          </ChatContext.Provider>
        </div>
      </div>
    </StompSessionProvider>
  );
}

export default App;
