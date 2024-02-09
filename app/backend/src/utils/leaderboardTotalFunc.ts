import { IMatches } from '../Interfaces/Matches/IMatches';

import { goalsBalanceHome, goalsScoredHome, goalsTookHome, totalDrawsHome,
  totalGamesHome, totalLosesHome, totalPointsHome, totalVictoriesHome,
} from './leaderboardFuncHome';

import { goalsBalanceAway, goalsScoredAway, goalsTookAway, totalDrawsAway,
  totalGamesAway, totalLosesAway, totalPointsAway, totalVictoriesAway,
} from './leaderboardFuncAway';

const totalAllPoints = (teamId: number, matches: IMatches[]): number => {
  const draws = (totalDrawsAway(teamId, matches) + totalDrawsHome(teamId, matches)) * 1;
  const victories = (totalVictoriesAway(teamId, matches) + totalVictoriesHome(teamId, matches)) * 3;
  const totalAll = draws + victories;
  return totalAll;
};

const efficiencyTotalAll = (teamId: number, matches: IMatches[]): string => {
  const totalPoints = totalPointsAway(teamId, matches) + totalPointsHome(teamId, matches);
  const totalGames = totalGamesAway(teamId, matches) + totalGamesHome(teamId, matches);
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return efficiency;
};

const totalAllGames = (teamId: number, matches: IMatches[]): number => {
  const totalGame = totalGamesAway(teamId, matches) + totalGamesHome(teamId, matches);
  return totalGame;
};

const totalAllVictories = (teamId: number, matches: IMatches[]): number => {
  const totalVic = totalVictoriesAway(teamId, matches) + totalVictoriesHome(teamId, matches);
  return totalVic;
};

const totalAllDraws = (teamId: number, matches: IMatches[]): number => {
  const draws = totalDrawsAway(teamId, matches) + totalDrawsHome(teamId, matches);
  return draws;
};

const totalAllLoses = (teamId: number, matches: IMatches[]): number => {
  const loses = totalLosesAway(teamId, matches) + totalLosesHome(teamId, matches);
  return loses;
};

const allGoalsScored = (teamId: number, matches: IMatches[]): number => {
  const allGoals = goalsScoredAway(teamId, matches) + goalsScoredHome(teamId, matches);
  return allGoals;
};

const allGoalsTook = (teamId: number, matches: IMatches[]): number => {
  const allGoalsTaken = goalsTookAway(teamId, matches) + goalsTookHome(teamId, matches);
  return allGoalsTaken;
};

const allGoalsBalance = (teamId: number, matches: IMatches[]): number => {
  const allBalance = goalsBalanceAway(teamId, matches) + goalsBalanceHome(teamId, matches);
  return allBalance;
};

export {
  totalAllPoints,
  efficiencyTotalAll,
  totalAllGames,
  totalAllVictories,
  totalAllDraws,
  totalAllLoses,
  allGoalsScored,
  allGoalsTook,
  allGoalsBalance,
};
