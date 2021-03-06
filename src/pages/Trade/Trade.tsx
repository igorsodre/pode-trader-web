import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LoadingSpinner from '../../components/UiElements/LoadingSpinner';
import { AppContext, IAppContext } from '../../data/app-context';
import { TradesResponse, TradeStaus } from '../../data/models/trade-item-interface';
import { useTrade } from '../../hooks/trade-service';
import ActiveTrades from './ActiveTrades';
import CompletedTrades from './CompletedTrades';
import './Trade.scss';

const Trade: React.FC<RouteComponentProps> = (props) => {
  const { addAppMessages } = useContext(AppContext) as IAppContext;
  const { getUserTrades, isLoadding, rejectTrade, acceptTrade } = useTrade();
  const [activeUserTrades, setActiveUserTrades] = useState<TradesResponse[]>([]);
  const [completedUserTrades, setCompletedUserTrades] = useState<TradesResponse[]>([]);

  const fetchAllUserTrades = async () => {
    try {
      const result = await getUserTrades();
      setActiveUserTrades(result.filter((t) => t.tradeStatus === TradeStaus.Active));
      setCompletedUserTrades(result.filter((t) => t.tradeStatus !== TradeStaus.Active));
    } catch (err) {
      console.log(err);
      addAppMessages([{ text: err.message, type: 'ERROR' }]);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAllUserTrades();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAcceptTradeHandler = async (trade: TradesResponse) => {
    try {
      await acceptTrade(trade.tradeId);
      await fetchAllUserTrades();
      addAppMessages([{ text: 'Trade accepted', type: 'SUCCESS' }]);
    } catch (err) {
      console.log(err);
      addAppMessages([{ text: err.message, type: 'ERROR' }]);
      console.log(err);
    }
  };

  const onRejectTradeHandler = async (trade: TradesResponse) => {
    try {
      await rejectTrade(trade.tradeId);
      await fetchAllUserTrades();
      addAppMessages([{ text: 'Trade rejected', type: 'SUCCESS' }]);
    } catch (err) {
      console.log(err);
      addAppMessages([{ text: err.message, type: 'ERROR' }]);
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      {isLoadding && <LoadingSpinner asOverlay />}
      <div className="row">
        <div className="col-2" />
        <div className="col-8">
          <div className="d-flex flex-column align-content-center">
            <h4 className="text-center">My trades</h4>
            <button
              className="btn btn-secondary"
              onClick={() => {
                props.history.push('/new-trade');
              }}
            >
              New trade
            </button>
          </div>
        </div>
      </div>

      <ActiveTrades
        onAcceptTrade={onAcceptTradeHandler}
        onRejectTrade={onRejectTradeHandler}
        tradeList={activeUserTrades}
      />
      <hr />
      <CompletedTrades tradeList={completedUserTrades} />
    </div>
  );
};

export default Trade;
