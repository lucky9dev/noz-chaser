import React, { useState } from 'react';
import { Button, Checkbox, Dropdown, Modal } from 'semantic-ui-react';
import useStore from 'store';

const Settings: React.FC = () => {
  const appState = useStore((state) => state);
  const [show, setShow] = useState(false);

  return (
    <Modal
      closeOnDimmerClick
      onClose={() => setShow(false)}
      open={show}
      trigger={<Dropdown.Item icon="options" onClick={() => setShow(true)} text="Settings" />}
    >
      <Modal.Header>Settings</Modal.Header>
      <Modal.Content style={{ display: 'flex', flexFlow: 'column nowrap', gap: '5px' }}>
        <Checkbox
          checked={appState.duplicates}
          data-testid="settings-dupes"
          label="Duplicate clause (Show alert on duplicate pokémon)"
          onChange={() => appState.changeDupe()}
        />
        <Checkbox
          checked={appState.nicknames}
          data-testid="settings-nickname"
          label="Show nicknames"
          onChange={() => appState.toggleNickname()}
        />
        <Checkbox
          checked={appState.missing}
          data-testid="settings-missing"
          label="Show only missing encounters"
          onChange={() => appState.toggleMissing()}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Settings;
