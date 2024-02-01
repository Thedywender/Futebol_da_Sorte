import MatchesModel from '../models/matchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../Interfaces/serviceResponse';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

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
}
