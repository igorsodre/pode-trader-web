import React from 'react';
import { TradesResponse } from '../../data/models/trade-item-interface';
import TradeItem from './TradeItem';

interface CompletedTradesProps {
  tradeList: TradesResponse[];
}
const CompletedTrades: React.FC<CompletedTradesProps> = (props) => {
  return (
    <div className="row mt-4">
      <div className="col-2" />
      <div className="col-8">
        <h4 className="text-center">Completed trades</h4>
        <div className="row mt-2">
          {props.tradeList.map((t) => (
            <TradeItem key={t.tradeId} tradeResponse={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedTrades;
