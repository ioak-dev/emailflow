import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { getProfile, setProfile } from '../../actions/ProfileActions';

import './NavElements.scss';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

interface Props {
  space: string;
  closeAfterRouteChange?: boolean;
  //   history: any;
  //   cookies: any;
  //   location: any;
  //   match: any;
}

const NavElements = (props: Props) => {
  const authorization = useSelector(state => state.authorization);

  const profile = useSelector(state => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="nav-elements">
      <NavItem
        to={`/${props.space}/home`}
        label="Home"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
      <NavItem
        to={`/${props.space}/project`}
        label="Projects"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
      <NavItem
        to={`/${props.space}/email-server`}
        label="Email Server"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
      <NavItem
        to={`/${props.space}/template`}
        label="Template"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
      <NavItem
        to={`/${props.space}/endpoint`}
        label="Help"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
    </div>
  );
};

export default NavElements;
