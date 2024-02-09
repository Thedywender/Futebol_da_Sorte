import { LeaderboardType } from '../Interfaces/leaderboard/leaderboradetypes';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import MatchesModel from '../models/matchesModel';
import TeamModel from '../models/teamsModel';
import { goalsScoredHome, goalsTookHome, totalDrawsHome, totalGamesHome,
  totalLosesHome, goalsBalanceHome, totalPointsHome, efficiencyHome, totalVictoriesHome,
} from '../utils/leaderboardFuncHome';

import { totalPointsAway, totalGamesAway, totalVictoriesAway, totalDrawsAway,
  totalLosesAway, goalsScoredAway, goalsTookAway, goalsBalanceAway, efficiencyAway,
} from '../utils/leaderboardFuncAway';

import sortTeams from '../utils/sortTeams';

import { allGoalsBalance, allGoalsScored, allGoalsTook, efficiencyTotalAll, totalAllDraws,
  totalAllGames, totalAllLoses, totalAllPoints, totalAllVictories,
} from '../utils/leaderboardTotalFunc';

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
      goalsFavor: goalsScoredHome(team.id, matches),
      goalsOwn: goalsTookHome(team.id, matches),
      goalsBalance: goalsBalanceHome(team.id, matches),
      efficiency: efficiencyHome(team.id, matches),
    }));
    sortTeams(homeMatches);
    return { status: 'SUCCESSFUL', data: homeMatches };
  }

  async getAllLeaderboardAway(): Promise<ServiceResponse<LeaderboardType[]>> {
    const teams = await this.teamsModel.findAll();
    const matches = await this.matchModel.findMatchesFind('false');
    const awayMatches = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsAway(team.id, matches),
      totalGames: totalGamesAway(team.id, matches),
      totalVictories: totalVictoriesAway(team.id, matches),
      totalDraws: totalDrawsAway(team.id, matches),
      totalLosses: totalLosesAway(team.id, matches),
      goalsFavor: goalsScoredAway(team.id, matches),
      goalsOwn: goalsTookAway(team.id, matches),
      goalsBalance: goalsBalanceAway(team.id, matches),
      efficiency: efficiencyAway(team.id, matches),
    }));
    sortTeams(awayMatches);
    return { status: 'SUCCESSFUL', data: awayMatches };
  }

  async getAllLeaderboard(): Promise<ServiceResponse<LeaderboardType[]>> {
    const teams = await this.teamsModel.findAll();
    const match = await this.matchModel.findMatchesFind('false');
    const allMatches = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalAllPoints(team.id, match),
      totalGames: totalAllGames(team.id, match),
      totalVictories: totalAllVictories(team.id, match),
      totalDraws: totalAllDraws(team.id, match),
      totalLosses: totalAllLoses(team.id, match),
      goalsFavor: allGoalsScored(team.id, match),
      goalsOwn: allGoalsTook(team.id, match),
      goalsBalance: allGoalsBalance(team.id, match),
      efficiency: efficiencyTotalAll(team.id, match),
    }));
    sortTeams(allMatches);
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
