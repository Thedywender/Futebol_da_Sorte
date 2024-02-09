import { IMatches } from '../Interfaces/Matches/IMatches';

const totalGamesHome = (teamId: number, matches: IMatches[]): number => {
  const games = matches
    .filter((match) => teamId === match.homeTeamId);
  return games.length;
};

const totalVictoriesHome = (teamId: number, matches: IMatches[]): number => {
  const victories = matches.filter((match) =>
    match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals);
  return victories.length;
};

const totalLosesHome = (teamId: number, matches: IMatches[]): number => {
  const losesHome = matches.filter((match) =>
    match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals);
  return losesHome.length;
};

const totalDrawsHome = (teamId: number, matches: IMatches[]): number => {
  const drawsHome = matches.filter((match) =>
    match.homeTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals);
  return drawsHome.length;
};

const totalPointsHome = (teamId: number, matches: IMatches[]): number => {
  const drawsHome = totalDrawsHome(teamId, matches) * 1;
  const totalVictories = totalVictoriesHome(teamId, matches) * 3;
  const totalPoint = drawsHome + totalVictories;
  return totalPoint;
};

const goalsScoredHome = (teamId: number, matches: IMatches[]): number =>
  matches.reduce((acc, curr) => {
    if (curr.homeTeamId === teamId) {
      return acc + curr.homeTeamGoals;
    }
    return acc;
  }, 0);

const goalsTookHome = (teamId: number, matches: IMatches[]): number =>
  matches.reduce((acc, curr) => {
    if (curr.homeTeamId === teamId) {
      return acc + curr.awayTeamGoals;
    }
    return acc;
  }, 0);

const goalsBalanceHome = (teamId: number, matches: IMatches[]): number => {
  const golsFavor = goalsScoredHome(teamId, matches);
  const goalsOwn = goalsTookHome(teamId, matches);
  const goalsBalance = golsFavor - goalsOwn;
  return goalsBalance;
};

const efficiencyHome = (teamId: number, matches: IMatches[]): string => {
  const P = totalPointsHome(teamId, matches);
  const J = totalGamesHome(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};

export {
  totalGamesHome,
  totalVictoriesHome,
  totalLosesHome,
  totalDrawsHome,
  totalPointsHome,
  goalsScoredHome,
  goalsTookHome,
  goalsBalanceHome,
  efficiencyHome,
};
