import { FC } from 'react';

export interface ChatMessage {
  name: string,
  message: string,
  time: string
}

type MessageProps = {
  message: ChatMessage,
  myName: String
}

const Message: FC<MessageProps> = (props) => {
  const myName = props.myName;
  const { name, message, time } = props.message;
  const displayName = name === myName ? 'You' : name;


  return (
    <div className={name === myName ? 'message-row-my' : 'message-row'}>
      <div className={name === myName ? 'message-my' : 'message'}>
        <p className='message-name'>{displayName}</p>
        <p>{message}</p>
        <p className='message-time'>{time}</p>
      </div>
    </div>
  );
};

export default Message;