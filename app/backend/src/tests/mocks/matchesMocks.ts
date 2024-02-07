const match = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
    inProgress: true
};

const matchInProgress =
    [
        {
          "id": 47,
          "homeTeamId": 8,
          "homeTeamGoals": 1,
          "awayTeamId": 14,
          "awayTeamGoals": 2,
          "inProgress": true,
          "homeTeam": {
            "teamName": "Grêmio"
          },
          "awayTeam": {
            "teamName": "Santos"
          }
        },
        {
          "id": 48,
          "homeTeamId": 13,
          "homeTeamGoals": 1,
          "awayTeamId": 2,
          "awayTeamGoals": 1,
          "inProgress": true,
          "homeTeam": {
            "teamName": "Real Brasília"
          },
          "awayTeam": {
            "teamName": "Bahia"
          }
        }
      ]

      const matchesInProgressFalse = [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 3,
          "homeTeamId": 4,
          "homeTeamGoals": 3,
          "awayTeamId": 11,
          "awayTeamGoals": 0,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Corinthians"
          },
          "awayTeam": {
            "teamName": "Napoli-SC"
          }
        },
    ]

    const invalidTokenMessage = {
        message: 'Token must be a valid token'
    }

    const matchErrorToken = "Bearer k4Fb9zV9VAq47yCnnJk078KQ5iC5db4"

    const matchValidToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzA3MjI0NjM4LCJleHAiOjE3MDc4Mjk0Mzh9.b3u-pCZytNew6Jt2vK7FIWD5-Jkhcl07kF22m0nMXkE"

    const matchNotFoundToken = { message: 'Token must be a valid token' };

    const newErrorMatchBody = {
        "id": 1,
        "homeTeamId": 1999999,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 2,
        "inProgress": true
    }

    const matchBodyInsert = {
            "homeTeamId": 16,
            "awayTeamId": 9, 
            "homeTeamGoals": 2,
            "awayTeamGoals": 2
      }

      const newMatch = {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 2,
        "inProgress": true
    }

    const newMatchBody = {
        "homeTeamId": 16,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      }

      const messageErrorCreate = {
        message: 'There is no team with such id!'
      }

      const messageFinished = {
        message: 'Finished'
      }

      const teamsGoalsUpdated = {
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        }

export {
    match,
    matchInProgress,
    matchesInProgressFalse,
    invalidTokenMessage,
    matchErrorToken,
    matchValidToken,
    matchNotFoundToken,
    newErrorMatchBody,
    matchBodyInsert,
    newMatch,
    newMatchBody,
    messageErrorCreate,
    messageFinished,
    teamsGoalsUpdated,
}