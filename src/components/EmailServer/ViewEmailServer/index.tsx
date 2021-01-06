import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import DetailSection from './DetailSection';
import OakTab from '../../../oakui/OakTab';
import { fetchAllApiKeys } from '../../../actions/ApiKeyActions';
import ApiKeySection from '../../Project/ViewProject/ApiKeySection';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewEmailServer = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const query = queryString.parse(props.location.search);
  const emailServer = useSelector(state =>
    state.emailServer.emailServers.find(item => item.id === query.id)
  );

  const tabMeta = [
    {
      slotName: 'settings',
      label: 'Settings',
      icon: 'settings',
    },
    {
      slotName: 'endpoints',
      label: 'Endpoints',
      icon: 'code',
    },
    {
      slotName: 'apikey',
      label: 'Api Keys',
      icon: 'vpn_key',
    },
  ];

  return (
    <OakPage>
      <OakTab meta={tabMeta} variant="fullpage">
        <div slot="settings">
          <OakSection>
            <DetailSection
              emailServer={emailServer}
              space={props.space}
              history={props.history}
            />
          </OakSection>
        </div>
        <div slot="endpoints">
          <OakSection>endpoint details here</OakSection>
        </div>
        <div slot="apikey">
          {emailServer && <OakSection>
            <ApiKeySection
              domainId={emailServer.id}
              scope="SERVER"
              space={props.space}
              history={props.history}
              refresh={() => dispatch(fetchAllApiKeys(props.space, authorization))}
            />
          </OakSection>}
        </div>
      </OakTab>
    </OakPage>
  );
};

export default ViewEmailServer;
