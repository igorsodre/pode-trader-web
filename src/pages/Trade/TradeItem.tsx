import React from 'react';
import Card from '../../components/UiElements/Card';
import { TradesResponse, TradeStaus } from '../../data/models/trade-item-interface';
import { calculateTotalBaseXP } from '../../util/pokemon-util';
import { isTradeFair } from '../../util/trade-util';

interface TradeItemProps {
  tradeResponse: TradesResponse;
  onAcceptTrade?: (trade: TradesResponse) => void;
  onRejectTrade?: (trade: TradesResponse) => void;
}
const TradeItem: React.FC<TradeItemProps> = (props) => {
  const {
    userNameSentBy,
    userNameSentTo,
    pokemonsRequested,
    pokemonsSent,
    sentByMe,
    tradeStatus,
  } = props.tradeResponse;
  const requestedTotalBaseXP = calculateTotalBaseXP(pokemonsRequested);
  const sentToTotalBaseXP = calculateTotalBaseXP(pokemonsSent);
  const tradeFairness = isTradeFair(requestedTotalBaseXP, sentToTotalBaseXP) ? 'Trade is fair' : 'Trade is not fair';
  return (
    <div className="col-6 trade-item-component">
      <Card secondary>
        <p>Status: {TradeStaus[tradeStatus]}</p>
        <p>
          Sent by: {userNameSentBy} {sentByMe && '(You)'}
        </p>
        <p>Sent to: {userNameSentTo}</p>
        <p>
          Pokemons requested: {pokemonsRequested.map((p) => p.pokemon.name).join(', ')} || Total base XP:{' '}
          {requestedTotalBaseXP}
        </p>
        <p>
          Pokemons Sent: {pokemonsSent.map((p) => p.pokemon.name).join(', ')} || Total base XP: {sentToTotalBaseXP}
        </p>
        <p>{tradeFairness}</p>
        {!sentByMe && tradeStatus === TradeStaus.Active && (
          <React.Fragment>
            <button
              className="btn btn-primary"
              onClick={() => props.onAcceptTrade && props.onAcceptTrade(props.tradeResponse)}
            >
              Accept Trade
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: 5 }}
              onClick={() => props.onRejectTrade && props.onRejectTrade(props.tradeResponse)}
            >
              Reject Trade
            </button>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

export default TradeItem;
