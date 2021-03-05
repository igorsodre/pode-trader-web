import React from 'react';
import { TradeItem } from '../../data/models/trade-item-interface';

interface ActiveTradesProps {
  tradeList: TradeItem[];
}
const ActiveTrades: React.FC<ActiveTradesProps> = (props) => {
  return <div>Active Trades</div>;
};

export default ActiveTrades;
