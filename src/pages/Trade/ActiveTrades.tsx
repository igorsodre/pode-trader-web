import React from 'react';
import { TradesResponse } from '../../data/models/trade-item-interface';
import TradeItem from './TradeItem';

interface ActiveTradesProps {
  tradeList: TradesResponse[];
  onAcceptTrade: (trade: TradesResponse) => void;
  onRejectTrade: (trade: TradesResponse) => void;
}
const ActiveTrades: React.FC<ActiveTradesProps> = (props) => {
  return (
    <div className="row mt-4">
      <div className="col-2" />
      <div className="col-8">
        <h4 className="text-center">Active trades</h4>
        <div className="row mt-2">
          {props.tradeList.map((t) => (
            <TradeItem
              key={t.tradeId}
              onAcceptTrade={props.onAcceptTrade}
              onRejectTrade={props.onRejectTrade}
              tradeResponse={t}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveTrades;
