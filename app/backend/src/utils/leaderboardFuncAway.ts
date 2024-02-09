// import { LeaderboardType } from '../Interfaces/leaderboard/leaderboradetypes';
import { IMatches } from '../Interfaces/Matches/IMatches';

const totalGamesAway = (teamId: number, matches: IMatches[]): number => {
  const game = matches.filter((match) => teamId === match.awayTeamId);
  return game.length;
};

const totalVictoriesAway = (teamId: number, matches: IMatches[]): number => {
  const victories = matches.filter((match) =>
    teamId === match.awayTeamId && match.awayTeamGoals > match.homeTeamGoals);
  return victories.length;
};

const totalDrawsAway = (teamId: number, matches: IMatches[]): number => {
  const draws = matches.filter((match) =>
    teamId === match.awayTeamId && match.awayTeamGoals === match.homeTeamGoals);
  return draws.length;
};

const totalLosesAway = (teamId: number, matches: IMatches[]): number => {
  const loses = matches.filter((match) =>
    teamId === match.awayTeamId && match.awayTeamGoals < match.homeTeamGoals);
  return loses.length;
};

const totalPointsAway = (teamId: number, matches: IMatches[]): number => {
  const victories = totalVictoriesAway(teamId, matches) * 3;
  const draws = totalDrawsAway(teamId, matches) * 1;
  return victories + draws;
};

const goalsTookAway = (teamId: number, matches: IMatches[]): number =>
  matches.reduce((acc, curr) => {
    if (curr.awayTeamId === teamId) {
      return acc + curr.homeTeamGoals;
    }
    return acc;
  }, 0);

const goalsScoredAway = (teamId: number, matches: IMatches[]) =>
  matches.reduce((acc, curr) => {
    if (curr.awayTeamId === teamId) {
      return acc + curr.awayTeamGoals;
    }
    return acc;
  }, 0);

const goalsBalanceAway = (teamId: number, matches: IMatches[]): number => {
  const goalsScored = goalsScoredAway(teamId, matches);
  const goalsTooked = goalsTookAway(teamId, matches);
  const balanceGoals = goalsScored - goalsTooked;
  return balanceGoals;
};

const efficiencyAway = (teamId: number, matches: IMatches[]): string => {
  const totalPoints = totalPointsAway(teamId, matches);
  const totalGames = totalGamesAway(teamId, matches);
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return efficiency;
};

export {
  totalGamesAway,
  totalVictoriesAway,
  totalDrawsAway,
  totalLosesAway,
  totalPointsAway,
  goalsTookAway,
  goalsScoredAway,
  goalsBalanceAway,
  efficiencyAway,
};
