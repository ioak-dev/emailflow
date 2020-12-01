import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakForm from '../../../oakui/OakForm';
import OakSelect from '../../../oakui/OakSelect';
import OakButton from '../../../oakui/OakButton';
import OakFooter from '../../../oakui/OakFooter';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ListTemplate = (props: Props) => {
  const projects = useSelector(state => state.project.projects);
  const [state, setState] = useState({
    projectId: '',
  });
  const [endpoints, setEndpoints] = useState<any[]>();
  const [projectElements, setProjectElements] = useState<any>([]);

  const allEndpoints = useSelector(state => state.endpoint.endpoints);

  useEffect(() => {
    setEndpoints(
      allEndpoints.filter(item => item.projectId === state.projectId)
    );
  }, [state.projectId, allEndpoints]);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setState({ ...state, projectId: query?.projectId });
  }, [props.location.search]);

  useEffect(() => {
    const localState: any[] = [];
    projects.map(item => {
      localState.push({ key: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const gotoCreatePage = () =>
    props.history.push(
      `/${props.space}/template/create?projectId=${state.projectId}`
    );

  const handleProjectChange = event => {
    props.history.push(
      `/${props.space}/template?projectId=${event.currentTarget.value}`
    );
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading title="Email templates" subtitle="Manage email templates" />
        <OakForm>
          <OakSelect
            id="projectId"
            data={state}
            handleChange={handleProjectChange}
            label="Choose project"
            objects={projectElements}
          />
        </OakForm>
        {state.projectId && (
          <>
            <OakFooter>
              <OakButton
                action={gotoCreatePage}
                theme="primary"
                variant="appear"
              >
                New endpoint
              </OakButton>
            </OakFooter>
            <div>hello world</div>
          </>
        )}
      </OakSection>
    </OakPage>
  );
};

export default ListTemplate;
