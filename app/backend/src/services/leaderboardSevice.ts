import { LeaderboardType } from '../Interfaces/leaderboard/leaderboradetypes';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import MatchesModel from '../models/matchesModel';
import TeamModel from '../models/teamsModel';
import { goalsFavorHome, goalsOwnHome, totalDrawsHome,
  totalGamesHome,
  totalLosesHome,
  goalsBalanceHome,
  totalPointsHome,
  efficiencyHome,
  totalVictoriesHome,
  sortTeams,
//   totalPointsAway,
//   totalVictoriesAway,
//   totalDrawsAway,
//   totalLosesAway,
//   goalsFavorAway,
//   goalsOwnAway,
//   goalsBalanceAway,
//   efficiencyAway,
//   totalGamesAway,
//   efficiencyTotal,
//   totalPointsAll,
} from '../utils/leaderboardeCalc';

export default class LeaderboardSevice {
  constructor(
    private matchModel = new MatchesModel(),
    private teamsModel = new TeamModel(),
  ) {}

  async getAllleaderboardHome(): Promise<ServiceResponse<LeaderboardType[]>> {
    const teams = await this.teamsModel.findAll();
    const matches = await this.matchModel.findMatchesFind('false');
    const homeMatches = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsHome(team.id, matches),
      totalGames: totalGamesHome(team.id, matches),
      totalVictories: totalVictoriesHome(team.id, matches),
      totalDraws: totalDrawsHome(team.id, matches),
      totalLosses: totalLosesHome(team.id, matches),
      goalsFavor: goalsFavorHome(team.id, matches),
      goalsOwn: goalsOwnHome(team.id, matches),
      goalsBalance: goalsBalanceHome(team.id, matches),
      efficiency: efficiencyHome(team.id, matches),
    }));
    sortTeams(homeMatches);
    return { status: 'SUCCESSFUL', data: homeMatches };
  }
}