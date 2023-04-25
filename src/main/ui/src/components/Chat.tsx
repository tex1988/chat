import { ChangeEvent, KeyboardEvent, FC, useEffect, useState } from 'react';
import Message, { IMessage } from './Message';

const Chat: FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [name, setName] = useState<string>('');
  let nameInput: string = '';
  let message: string = '';

  useEffect(() => {
  }, [name]);

  function onNameInput(event: ChangeEvent<HTMLInputElement>): void {
    nameInput = event.target.value;
  }

  function onMessageInput(event: ChangeEvent<HTMLTextAreaElement>): void {
    message = event.target.value;
  }

  function onMessageSend(): void {
    validateName();
  }

  function onTextAreaKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      onMessageSend();
    }
  }

  function onNameInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      setName(nameInput);
    }
  }

  function validateName(): void {
    if (name.length < 3) {
      alert('Please enter name not less than 3 characters');
    }
  }

  return (
    <>
      <div className='flex-row-center'>
        <input className='input' type='text' name='Name' placeholder='Enter your name' onChange={onNameInput}
               onKeyDown={onNameInputKeyPress} />
        <button onClick={() => setName(nameInput)} className='button'>Set name</button>
      </div>
      <div className='flex-row-center'>
        <p>Your name: {name}</p>
      </div>
      <div className='message-area'>
        <Message {...{
          message: { name: 'Tex', message: 'This is a long message...', time: '18:00' },
          myName: name,
        }} />
        <Message {...{
          message: {
            name: 'Oleksii',
            message: 'Another long message............................................................',
            time: '18:00',
          },
          myName: name,
        }} />
        {
          messages.map((message, index) => <Message {...{ message: message, myName: name }} key={index} />)
        }
      </div>
      <div className='text-area-container'>
        <textarea className='text-area' onChange={onMessageInput} onKeyDown={onTextAreaKeyPress}></textarea>
      </div>
      <div className='flex-row-center'>
        <button className='button' onClick={onMessageSend}>Send message</button>
      </div>
    </>
  );
};

export default Chat;