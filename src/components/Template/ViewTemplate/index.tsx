import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import DetailSection from './DetailSection';
import OakTab from '../../../oakui/OakTab';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewTemplate = (props: Props) => {
  const query = queryString.parse(props.location.search);
  const template = useSelector(state =>
    state.template.templates.find(item => item.id === query.id)
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
  ];

  return (
    <OakPage>
      <OakTab meta={tabMeta} variant="fullpage">
        <div slot="settings">
          <OakSection>
            <DetailSection
              template={template}
              space={props.space}
              history={props.history}
            />
          </OakSection>
        </div>
        <div slot="endpoints">
          <OakSection>endpoint details here</OakSection>
        </div>
      </OakTab>
    </OakPage>
  );
};

export default ViewTemplate;
