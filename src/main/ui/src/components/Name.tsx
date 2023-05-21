import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  StyleHTMLAttributes,
  useContext,
  useState,
} from 'react';
import { UserContext } from './Chat';

const Name: FC = () => {
  const { userName, onNameSave } = useContext(UserContext);
  const [nameInput, setNameInput] = useState<string>('');
  const [isEditMode, setEditMode] = useState<boolean>(!userName);

  function onNameInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      onSaveButtonClick();
    }
  }

  function onNameInput(event: ChangeEvent<HTMLInputElement>): void {
    setNameInput(event.target.value);
  }

  function onNameClick() {
    setNameInput(userName ? userName : '');
    setEditMode(true);
  }

  function onSaveButtonClick() {
    onNameSave(nameInput);
    setEditMode(false);
  }

  return (
    <>
      {isEditMode && (
        <div className="flex-row-center">
          <input
            className="input"
            value={nameInput}
            placeholder="Enter your name"
            onChange={onNameInput}
            onKeyDown={onNameInputKeyPress}
          />
          <button onClick={onSaveButtonClick} className="button">
            Set name
          </button>
        </div>
      )}
      {userName && !isEditMode && (
        <div className="flex-row-center" style={styles.nameRow}>
          <span>Welcome to chat:</span>
          <span onClick={onNameClick} style={styles.name}>
            {userName}
          </span>
        </div>
      )}
    </>
  );
};

const styles = {
  nameRow: {
    fontSize: '13px',
    padding: '0 5px 0 5px',
  },

  name: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default Name;
