import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import emailflowWhite from '../../images/emailflow_white.svg';
import emailflowBlack from '../../images/emailflow_black.svg';

const Logo = () => {
  const authorization = useSelector(state => state.authorization);

  const profile = useSelector(state => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      <img
        className="logo--image"
        src={emailflowWhite}
        alt="Infinite reserve logo"
      />
    </div>
  );
};

export default Logo;
