import { FC, useContext } from 'react';
import { UserContext } from './Chat';

export interface ChatMessage {
  name: string;
  content: string;
  time: string;
}

const Message: FC<ChatMessage> = (props) => {
  const { userName } = useContext(UserContext);
  const { name, content, time } = props;
  const isMyMessage = name === userName;
  const displayName = isMyMessage ? 'You' : name;

  return (
    <div className={isMyMessage ? 'message-row-my' : 'message-row'}>
      <div className={isMyMessage ? 'message-my' : 'message'}>
        <p className="message-name">{displayName}</p>
        <p>{content}</p>
        <p className="message-time">{time}</p>
      </div>
    </div>
  );
};

export default Message;
