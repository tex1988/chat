import { FC, useContext } from 'react';
import { UserContext } from './Chat';
import getUserLocale from 'get-user-locale';

export interface ChatMessage {
  name: string;
  content: string;
  dateTime: string;
}

const Message: FC<ChatMessage> = (props) => {
  const { userName } = useContext(UserContext);
  const { name, content, dateTime } = props;
  const localTime = getLocalTime(dateTime);
  const isMyMessage = name === userName;
  const displayName = isMyMessage ? 'You' : name;

  function getLocalTime(dateTime: string): string {
    const userLocale: string | null = getUserLocale();
    const locale: string = userLocale ? userLocale : 'en-US';
    return new Date(dateTime).toLocaleTimeString(locale, {timeStyle: 'short'});
  }

  return (
    <div className={isMyMessage ? 'message-row-my' : 'message-row'}>
      <div className={isMyMessage ? 'message-my' : 'message'}>
        <p className="message-name">{displayName}</p>
        <p>{content}</p>
        <p className="message-time">{localTime}</p>
      </div>
    </div>
  );
};

export default Message;
