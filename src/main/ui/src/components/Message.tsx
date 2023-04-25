import { FC } from 'react';

export interface IMessage {
  name: string,
  message: string,
  time: string
}

type MessageProps = {
  message: IMessage,
  myName: String
}

const Message: FC<MessageProps> = (props) => {
  const myName = props.myName;
  const { name, message, time } = props.message;


  return (
    <div className={name === myName ? 'message-row-my' : 'message-row'}>
      <div className={name === myName ? 'message-my' : 'message'}>
        <p className='message-name'>{name}</p>
        <p>{message}</p>
        <p className='message-time'>{time}</p>
      </div>
    </div>
  );
};

export default Message;