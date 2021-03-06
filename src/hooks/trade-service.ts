import { useCallback } from 'react';
import { GET_BASE_URL } from '../data/constants';
import { TradesResponse } from '../data/models/trade-item-interface';
import { useBaseHttp } from './base-http';
import { BaseHttpHookType } from './hooks-interfaces';

interface TradeHttpService extends BaseHttpHookType {
  addTradeRequest: (requestedUserId: number, requestedPokemons: number[], givenPokemons: number[]) => Promise<string>;
  getUserTrades: () => Promise<TradesResponse[]>;
  acceptTrade: (tradeId: number) => Promise<string>;
  rejectTrade: (tradeId: number) => Promise<string>;
}
export const useTrade = (): TradeHttpService => {
  const { errorText, getRequest, postRequest, isLoadding, clearError } = useBaseHttp();

  const addTradeRequest = useCallback(
    async (requestedUserId: number, requestedPokemons: number[], givenPokemons: number[]) => {
      const endpoint = GET_BASE_URL() + '/api/trades/';
      const body = { requestedUserId, requestedPokemons, givenPokemons };
      return postRequest<{ data: string }>(endpoint, body).then((res) => res.data);
    },
    [postRequest],
  );

  const getUserTrades = useCallback(async () => {
    const endpoint = GET_BASE_URL() + '/api/trades/';
    return getRequest<{ data: TradesResponse[] }>(endpoint).then((res) => res.data);
  }, [getRequest]);

  const acceptTrade = useCallback(
    async (tradeId: number) => {
      const endpoint = GET_BASE_URL() + '/api/trades/accept';
      const body = { tradeId };
      return postRequest<{ data: string }>(endpoint, body).then((res) => res.data);
    },
    [postRequest],
  );

  const rejectTrade = useCallback(
    async (tradeId: number) => {
      const endpoint = GET_BASE_URL() + '/api/trades/reject';
      const body = { tradeId };
      return postRequest<{ data: string }>(endpoint, body).then((res) => res.data);
    },
    [postRequest],
  );

  return {
    errorText,
    isLoadding,
    clearError,
    getUserTrades,
    addTradeRequest,
    acceptTrade,
    rejectTrade,
  };
};
