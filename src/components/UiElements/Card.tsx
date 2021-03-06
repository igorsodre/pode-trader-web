import React from 'react';

import './Card.scss';
interface CardProps {
  secondary?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
const Card: React.FC<CardProps> = ({ children, secondary, className, style }) => {
  if (!secondary)
    return (
      <div className="card">
        <div className="card-body" style={{ width: '100%' }}>
          {children}
        </div>
      </div>
    );
  return (
    <div className={`card-component ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
