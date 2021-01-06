import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OakHeading from '../../oakui/OakHeading';
import OakSection from '../../oakui/OakSection';
import OakSubheading from '../../oakui/OakSubheading';
import './style.scss';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  history: any;
}

const Home = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  return (
    <div className="page-home">
      <OakSection>
        <OakHeading
          title="Simplify email communications from your app"
          subtitle="Send emails from you application using REST API. Build campaign or marketing email using velocity templates."
        />
        <div className="page-home--steps">
          <div className="page-home--steps--container">
            <OakSubheading title="Welcome aboard!" />
            <div className="page-home--steps--container--subtitle">
              Your single stop to handle email communications from all of your applications.
            </div>
          </div>
        </div>
      </OakSection>
    </div>
  );
};

export default Home;
