import ITeams from './ITeams';

export default interface TeamModel {
  findAll(): Promise<ITeams[]>
}
