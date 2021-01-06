import React, { useState, useEffect } from 'react';
import './styles/oak-heading-emailflow.scss';

interface Props {
  size?: 'large';
  link: {
    label: string;
    icon?: any;
    action: any;
  };
}

const OakHeadingLink = (props: Props) => {
  const getLinkSize = () => {
    return props.size === 'large' ? 'typography-5' : 'typography-4';
  };
  return (
    <div className="oak-heading-link" onClick={() => props.link.action()}>
      {props.link.icon && props.link.icon}
      <div className={`heading-link-label ${getLinkSize()}`}>
        {props.link.label}
      </div>
    </div>
  );
};

export default OakHeadingLink;
