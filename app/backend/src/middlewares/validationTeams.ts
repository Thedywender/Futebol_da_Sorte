import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

export default class ValidationsTeams {
  private static teamService = new TeamService();

  static async validateTeam(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    const team1 = await ValidationsTeams.teamService.getTeamsById(Number(homeTeamId));
    const team2 = await ValidationsTeams.teamService.getTeamsById(Number(awayTeamId));

    if (team1.status === 'NOT_FOUND' || team2.status === 'NOT_FOUND' || !team1 || !team2) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
