import { FAIR_TRADE_PERCENTAGE } from '../data/constants';

export const isTradeFair = (baseXP1: number, baseXP2: number): boolean => {
  // Se um dos valores for 0, não tem troca
  if (!baseXP1 || !baseXP2) {
    return true;
  }

  let percentage: number;
  if (baseXP1 > baseXP2) {
    percentage = baseXP2 / baseXP1;
  } else {
    percentage = baseXP1 / baseXP2;
  }

  return percentage >= FAIR_TRADE_PERCENTAGE / 100;
};
