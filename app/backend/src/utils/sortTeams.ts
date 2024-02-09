import { LeaderboardType } from '../Interfaces/leaderboard/leaderboradetypes';

const sortTeams = (team: LeaderboardType[]): LeaderboardType[] => {
  team.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  return team;
};

export default sortTeams;
