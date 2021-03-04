import React from 'react';

const Card: React.FC = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body" style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default Card;
