import React, {
  ChangeEvent,
  createContext,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Message, { ChatMessage } from './Message';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import Name from './Name';

export const UserContext = createContext<UserContextType>({
  userName: null,
  onNameSave: () => {},
});

type UserContextType = {
  userName: string | null;
  onNameSave: (name: string) => void;
};

const Chat: FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userName, setUserName] = useState<string | null>(getUserName);
  const userContextValue: UserContextType = {
    userName,
    onNameSave: (name: string) => onNameSave(name),
  };
  const [messageInput, setMessageInput] = useState<string>('');
  const messageEnd = useRef<HTMLDivElement>(null);
  const stompClient = useStompClient();
  useSubscription('/topic/general', (message) =>
    handleMessage(JSON.parse(message.body) as ChatMessage),
  );

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, userName]);

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  function getUserName(): string | null {
    const name: string | null = window.localStorage.getItem('name');
    return !!name ? name : null;
  }

  function saveUserNameToLS(name: string): void {
    if (name.length > 0) {
      window.localStorage.setItem('name', name);
    }
  }

  function handleMessage(message: ChatMessage) {
    setMessages((messages) => [...messages, message]);
  }

  function onNameSave(name: string): void {
    setUserName(name);
    saveUserNameToLS(name);
  }

  function onMessageInput(event: ChangeEvent<HTMLTextAreaElement>): void {
    setMessageInput(event.target.value);
  }

  function onMessageSend(): void {
    if (validateName(userName)) {
      stompClient?.publish({
        destination: `/app/general`,
        body: JSON.stringify({ name: userName, content: messageInput }),
      });
      setMessageInput('');
    }
  }

  function onTextAreaKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && event.altKey) {
      onMessageSend();
    }
  }

  function validateName(name: string | null | undefined): boolean {
    if (name && name.length < 3) {
      alert('Please enter name not less than 3 characters');
      return false;
    }
    return true;
  }

  return (
    <>
      <UserContext.Provider value={userContextValue}>
        <Name />
        <div className="message-area">
          {messages.map((message, index) => (
            <Message {...message} key={index} />
          ))}
          <div ref={messageEnd} />
        </div>
        <div className="message-editor">
          <div className="text-area-container">
            <textarea
              className="text-area"
              value={messageInput}
              onChange={onMessageInput}
              onKeyDown={onTextAreaKeyPress}
            />
          </div>
          <button className="button" onClick={onMessageSend} disabled={messageInput.length < 1}>
            Send message
          </button>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default Chat;
