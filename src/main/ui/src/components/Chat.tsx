import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Message, { ChatMessage } from './Message';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

const Chat: FC = () => {
  // const defaultMessages: ChatMessage[] = [{ name: 'Tex', message: 'This is a long message...', time: '18:00' },
  //   { name: 'Oleksii',
  //       message: 'Another long message............................................................',
  //       time: '18:00',
  //     }
  // ];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const name = useRef<string>('');
  const [displayName, setDisplayName] = useState<string>(name.current);
  const [nameInput, setNameInput] = useState<string>('');
  const [messageInput, setMessageInput] = useState<string>('')
  const stompClient = useStompClient();
  useSubscription('/topic/general',
    (message) => handleMessage(JSON.parse(message.body) as ChatMessage));

  useEffect(() => {
  }, [messages, displayName]);

  useEffect(() => {
    name.current = getName();
  }, []);

  function getName(): string {
    const name: string | null = window.localStorage.getItem('name');
    return !!name ? name : '';
  }

  function putNameToLS(name: string): void {
    if (name.length > 0) {
      window.localStorage.setItem('name', name);
    }
  }

  function handleMessage(message: ChatMessage) {
    setMessages(messages => [...messages, message]);
  }

  function onNameInput(event: ChangeEvent<HTMLInputElement>): void {
    setNameInput(event.target.value);
  }

  function onSetNameButtonClick(): void {
    name.current = nameInput;
    setDisplayName(nameInput);
    putNameToLS(nameInput)
  }

  function onMessageInput(event: ChangeEvent<HTMLTextAreaElement>): void {
    setMessageInput(event.target.value);
  }

  function onMessageSend(): void {
    if (validateName()) {
      stompClient?.publish({
        destination: `/app/general`,
        body: JSON.stringify({ name: name.current, message: messageInput }),
      });
      setMessageInput('');
    }
  }

  function onTextAreaKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && event.altKey) {
      onMessageSend();
    }
  }

  function onNameInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      onSetNameButtonClick();
    }
  }

  function validateName(): boolean {
    if (name.current.length < 3) {
      alert('Please enter name not less than 3 characters');
      return false;
    }
    return true;
  }

  return (
    <>
      <div className='flex-row-center'>
        <input className='input' value={nameInput} placeholder='Enter your name' onChange={onNameInput}
               onKeyDown={onNameInputKeyPress} />
        <button onClick={onSetNameButtonClick} className='button'>Set name</button>
      </div>
      <div className='flex-row-center'>
        <p>Your name: {name.current}</p>
      </div>
      <div className='message-area'>
        {
          messages.map((message, index) => <Message {...{ message: message, myName: name.current }} key={index} />)
        }
      </div>
      <div className='text-area-container'>
        <textarea className='text-area' value={messageInput} onChange={onMessageInput} onKeyDown={onTextAreaKeyPress}></textarea>
      </div>
      <div className='flex-row-center'>
        <button className='button' onClick={onMessageSend}>Send message</button>
      </div>
    </>
  );
};

export default Chat;