import ITeams from '../Interfaces/Teams/ITeams';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import TeamModel from '../models/teamsModel';
import ITeamsModel from '../Interfaces/Teams/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamsModel = new TeamModel()) {}

  async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
