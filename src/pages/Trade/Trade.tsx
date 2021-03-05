import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ActiveTrades from './ActiveTrades';
import CompletedTrades from './CompletedTrades';
import './Trade.scss';

const Trade: React.FC<RouteComponentProps> = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center">
            <h4>Trade Page</h4>
            <button
              className="btn btn-secondary"
              onClick={() => {
                props.history.push('/new-trade');
              }}
            >
              Go To New Trade
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ActiveTrades tradeList={[]} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <CompletedTrades tradeList={[]} />
        </div>
      </div>
    </div>
  );
};

export default Trade;
