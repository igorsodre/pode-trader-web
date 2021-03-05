import React from 'react';
import { TradeItem } from '../../data/models/trade-item-interface';

interface CompletedTradesProps {
  tradeList: TradeItem[];
}
const CompletedTrades: React.FC<CompletedTradesProps> = (props) => {
  return <div>Completed Trades</div>;
};

export default CompletedTrades;
