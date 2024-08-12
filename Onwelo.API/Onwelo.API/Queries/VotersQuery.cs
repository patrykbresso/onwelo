using Dapper;
using Onwelo.API.DTOs;
using System.Data;

namespace Onwelo.API.Queries
{
    public class VotersQuery(IDbConnection _dbConnection) : IVotersQuery
    {
        public async Task<VoterDTO[]> GetVotersAsync(CancellationToken cancellationToken)
        {
            var result = await _dbConnection.QueryAsync<VoterDTO>(
                @"SELECT
                        v.Id,
                        p.Fullname AS Fullname,
                        CASE
                            WHEN v.CandidateId IS NOT NULL THEN 1
                            ELSE 0
                        END AS HasVoted
                    FROM
                        [dbo].Voters v
                    LEFT JOIN
                        [dbo].People p
                    ON
                        v.PersonId = p.Id",
                cancellationToken
            );

            return result.ToArray();
        }
    }
}