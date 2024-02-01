import { IMatches } from '../Interfaces/Matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

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
}
