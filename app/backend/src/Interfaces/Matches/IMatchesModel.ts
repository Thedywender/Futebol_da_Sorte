import { IMatches, MatchNoId, MatchesData } from './IMatches';

export interface UpdateType {
  homeTeamGoals: number; awayTeamGoals: number; id: number;
}

export default interface IMatchesModel {
  findAll(query: string): Promise<IMatches[]>,
  findMatchesFind(query: string): Promise<IMatches[]>;
  updateMatchFinish(id: number): Promise<void>;
  createMatches(matchesdata: MatchesData): Promise<MatchNoId<IMatches>>;
}
