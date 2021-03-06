import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import DetailSection from './DetailSection';
import OakTab from '../../../oakui/OakTab';
import { getProjectMembers } from '../service';
import MemberSection from './MemberSection';
import ApiKeySection from './ApiKeySection';
import { fetchAllApiKeys } from '../../../actions/ApiKeyActions';
import { Dehaze, People, Settings, VpnKey } from '@material-ui/icons';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewProject = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const query = queryString.parse(props.location.search);
  const project = useSelector(state =>
    state.project.projects.find(item => item.id === query.id)
  );
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (project) {
        await fetchMembers();
      }
    })();
  }, [project]);

  const fetchMembers = async () => {
    const response = await getProjectMembers(
      props.space,
      authorization,
      project._id
    );

    if (response.status === 200) {
      setMembers(response.data.data);
    }
  };

  const tabMeta = [
    {
      slotName: 'overview',
      label: 'Overview',
      icon: <Dehaze />
    },
    {
      slotName: 'member',
      label: 'Members',
      icon: <People />
    },
    {
      slotName: 'administrator',
      label: 'Administrators',
      icon: <Settings />
    },
    {
      slotName: 'apikey',
      label: 'Api Keys',
      icon: <VpnKey />,
    },
  ];

  return (
    <OakPage>
      <OakTab meta={tabMeta} variant="fullpage">
        <div slot="overview">
          <OakSection>
            <DetailSection
              project={project}
              space={props.space}
              history={props.history}
            />
          </OakSection>
        </div>
        <div slot="member">
          <OakSection>
            <MemberSection
              project={project}
              space={props.space}
              history={props.history}
              members={members}
              type="MEMBER"
              refresh={fetchMembers}
            />
          </OakSection>
        </div>
        <div slot="administrator">
          <OakSection>
            <MemberSection
              project={project}
              space={props.space}
              history={props.history}
              members={members}
              type="ADMINISTRATOR"
              refresh={fetchMembers}
            />
          </OakSection>
        </div>
        <div slot="apikey">
          {project &&
          <OakSection>
            <ApiKeySection
              domainId={project.id}
              scope="PROJECT"
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

export default ViewProject;
