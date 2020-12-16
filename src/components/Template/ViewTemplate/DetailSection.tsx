import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import OakButton from '../../../oakui/OakButton';
import OakFooter from '../../../oakui/OakFooter';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import saveTemplate from '../service';

interface Props {
  space: string;
  history: any;
  template: any;
}

const DetailSection = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [state, setState] = useState({
    name: '',
    subject: '',
    body: '',
  });

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setState({ ...state, ...props.template });
  }, [props.template]);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setIsEdited(true);
  };

  const handleNameChange = event => {
    setState({
      ...state,
      name: event.currentTarget.value,
    });
    setIsEdited(true);
  };

  const handleSubjectChange = event => {
    setState({
      ...state,
      subject: event.currentTarget.value,
    });
    setIsEdited(true);
  };

  const discardChanges = () => {
    setState({ ...state, ...props.template });
    setIsEdited(false);
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving project [${state.name}]`,
    });
    const response = await saveTemplate(props.space, authorization, {
      ...state,
    });
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Template [${state.name}] saved successfully`,
        duration: 3000,
      });
      props.history.push(`/${props.space}/template`);
    }
  };

  return (
    <div className="project-detail-section">
      {props.template && (
        <OakForm>
          <OakText
            data={state}
            id="name"
            handleChange={handleNameChange}
            label="Template name"
          />
          <OakText
            data={state}
            id="subject"
            handleChange={handleSubjectChange}
            label="Subject"
          />
          <OakText
            data={state}
            id="body"
            handleChange={handleChange}
            label="Template Body"
            multiline
          />
        </OakForm>
      )}
      {isEdited && (
        <OakFooter>
          <OakButton theme="primary" variant="appear" action={save}>
            Save
          </OakButton>
          <OakButton theme="default" variant="appear" action={discardChanges}>
            Discard
          </OakButton>
        </OakFooter>
      )}
    </div>
  );
};

export default DetailSection;
