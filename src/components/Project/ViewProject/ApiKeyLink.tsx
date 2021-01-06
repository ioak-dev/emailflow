import { Delete } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import OakButton from '../../../oakui/OakButton';
import { removeApiKey } from '../../ApiKeyService';
import { removeProjectMember } from '../service';

import './ApiKeyLink.scss';

interface Props {
  space: string;
  apiKey: any;
  refresh: any;
}

const ApiKeyLink = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [showConfirm, setShowConfirm] = useState(false);

  const remove = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Removing member from project`,
    });
    const response = await removeApiKey(
      props.space,
      authorization,
      props.apiKey.id
    );

    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Delete Api Key`,
        duration: 3000,
      });
      props.refresh();
    }
  };

  return (
    <div className="api-key-link">
      <div className="api-key-link--text">{props.apiKey.key}</div>
      <div className="api-key-link--action" onClick={remove}><Delete /></div>
    </div>
  );
};

export default ApiKeyLink;
