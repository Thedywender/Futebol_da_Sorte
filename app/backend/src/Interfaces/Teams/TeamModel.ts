import ITeams from './ITeams';

export default interface ITeamsModel {
  findAll(): Promise<ITeams[]>,
  findById(id: ITeams['id']): Promise<ITeams | null>,
}
