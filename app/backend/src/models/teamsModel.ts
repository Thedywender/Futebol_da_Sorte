import ITeams from '../Interfaces/Teams/ITeams';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeamModel from '../Interfaces/Teams/TeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
