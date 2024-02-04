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

      const matchesNotInProgress = [
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

    const matchValidToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzA2ODQ2MzkyLCJleHAiOjE3MDc0NTExOTJ9.fb3I6leoC1al60RVj8k3RD3ITEVsDRt2BFUpL9FXrws"

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

export {
    match,
    matchInProgress,
    matchesNotInProgress,
    invalidTokenMessage,
    matchErrorToken,
    matchValidToken,
    matchNotFoundToken,
    newErrorMatchBody,
    matchBodyInsert,
    newMatch,
    newMatchBody,

}