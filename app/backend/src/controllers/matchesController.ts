import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class matchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matchResponse = await this.matchesService.getAllMatches();
      return res.status(200).json(matchResponse.data);
    }
    const matchFound = await this.matchesService.getFindMatchesFind(String(inProgress));
    return res.status(200).json(matchFound.data);
  }
}
