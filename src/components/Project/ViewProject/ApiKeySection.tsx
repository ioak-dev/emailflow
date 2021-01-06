import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import OakSubheading from '../../../oakui/OakSubheading';
import OakAutoComplete from '../../../oakui/OakAutoComplete';
import { addProjectMember } from '../service';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import OakButton from '../../../oakui/OakButton';
import MemberLink from './MemberLink';
import OakFooter from '../../../oakui/OakFooter';
import OakSection from '../../../oakui/OakSection';
import { addApiKey } from '../../ApiKeyService';
import ApiKeyLink from './ApiKeyLink';

interface Props {
  space: string;
  history: any;
  domainId: any;
  scope: string;
  refresh: any;
}

const ApiKeySection = (props: Props) => {
  const users = useSelector(state => state.user.users);
  const authorization = useSelector(state => state.authorization);
  const apiKeys = useSelector(state => state.apiKey.apiKeys.filter(item => item.domainId === props?.domainId && item.scope === props?.scope));
  const [userMap, setUserMap] = useState<any>({});

  useEffect(() => {
    const localMap = {};
    users?.forEach(item => (localMap[item._id] = item));
    setUserMap(localMap);
  }, [users]);

  useEffect(() => {
    console.log(apiKeys);
  }, [apiKeys]);

  const generate = async () => {

    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Generating Api Key`,
    });
    const response = await addApiKey(props.space, authorization, {
      scope: props.scope,
      domainId: props.domainId
    });
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Api Key generated successfully`,
        duration: 3000,
      });
      props.refresh();
    }
  }

  return (
    <div className="api-key-section">
      <OakFooter align="center">
        <OakButton action={generate} theme="primary" variant="appear">Generate new key</OakButton>
      </OakFooter>
      <div className="api-key-section--list">
      {apiKeys && apiKeys.map(apiKey => (
              <ApiKeyLink
                space={props.space}
                apiKey={apiKey}
                refresh={props.refresh}
              />
            ))}

      </div>
    </div>
  );
};

export default ApiKeySection;
