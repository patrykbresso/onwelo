using Dapper;
using Onwelo.API.DTOs;
using System.Data;

namespace Onwelo.API.Queries
{
    public class CandidatesQuery(IDbConnection _dbConnection) : ICandidatesQuery
    {
        public async Task<CandidateDTO[]> GetCandidatesAsync(CancellationToken cancellationToken)
        {
            var result = await _dbConnection.QueryAsync<CandidateDTO>(
                @"SELECT
                        c.Id,
                        MAX(p.Fullname) AS Fullname,
                        COUNT(v.Id) AS NumberOfVotes
                    FROM
                        [dbo].Candidates c
                    LEFT JOIN
                        [dbo].Voters v ON c.Id = v.CandidateId
                    LEFT JOIN
                        [dbo].People p ON c.PersonId = p.Id
                    GROUP BY
                        c.Id",
                cancellationToken
            );

            return result.ToArray();
        }
    }
}