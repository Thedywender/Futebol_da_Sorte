import ITeams from '../Interfaces/Teams/ITeams';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeamModel from '../Interfaces/Teams/TeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
