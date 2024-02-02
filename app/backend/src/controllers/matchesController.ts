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

  async updateMatchFinish(req: Request, res: Response) {
    const { id } = req.params;
    const updateFinish = await this.matchesService.updateMatchFinish(Number(id));
    return res.status(200).json(updateFinish.data);
  }

  async updateMatchId(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updateId = await this.matchesService
      .updateMatchId(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(200).json(updateId.data);
  }

  async createMatches(req: Request, res: Response) {
    const creatematch = await this.matchesService.createMatches(req.body);
    return res.status(201).json(creatematch.data);
  }
}
