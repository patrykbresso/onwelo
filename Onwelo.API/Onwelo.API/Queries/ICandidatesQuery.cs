using Onwelo.API.DTOs;

namespace Onwelo.API.Queries
{
    public interface ICandidatesQuery
    {
        Task<CandidateDTO[]> GetCandidatesAsync(CancellationToken cancellationToken);
    }
}