import { IMatches, MatchesData } from '../Interfaces/Matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import TeamService from '../services/teamService';
import { ServiceResponse } from '../Interfaces/serviceResponse';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  private teamService = new TeamService();

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return dbData;
  }

  async findMatchesFind(query: string): Promise<IMatches[]> {
    const progress = query === 'true';
    const teams = await this.model.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return teams;
  }

  async updateMatchFinish(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatchId(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatches(matchesdata: MatchesData):
  Promise<ServiceResponse<IMatches>> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = matchesdata;

    const teamExist1 = await this.teamService.getTeamsById(Number(homeTeamId));
    const teamExist2 = await this.teamService.getTeamsById(Number(awayTeamId));

    if (!teamExist1 || !teamExist2) {
      return {
        status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const creatematch = await this.model.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });
    return { status: 'CREATED', data: creatematch };
  }
}
