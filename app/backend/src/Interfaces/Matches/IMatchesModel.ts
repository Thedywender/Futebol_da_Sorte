import { IMatches } from './IMatches';

export default interface IMatchesModel {
  findAll(query: string): Promise<IMatches[]>,
  findMatchesFind(query: string): Promise<IMatches[]>;
}
