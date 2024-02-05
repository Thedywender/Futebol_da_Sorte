import MatchesModel from '../models/matchesModel';
import { IMatches, MatchNoId, MatchesData } from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import TeamService from './teamService';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamService = new TeamService(),
  ) {}

  async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async getFindMatchesFind(query: string): Promise<ServiceResponse<IMatches[]>> {
    const filteredMatches = await this.matchesModel.findMatchesFind(query);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  }

  async updateMatchFinish(id: number): Promise<ServiceResponse<{ message: 'Finished' }>> {
    await this.matchesModel.updateMatchFinish(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatchId(homeTeamGoals:
  number, awayTeamGoals: number, id: number): Promise<ServiceResponse<{ message: 'ok' }>> {
    await this.matchesModel.updateMatchId(homeTeamGoals, awayTeamGoals, id);
    return { status: ('SUCCESSFUL'), data: { message: 'ok' } };
  }

  async createMatches(
    matchesdata: MatchesData,
  ): Promise<ServiceResponse<MatchNoId<IMatches>>> {
    const team = await this.matchesModel.createMatches(matchesdata);
    return { status: 'CREATED', data: team };
  }
}
