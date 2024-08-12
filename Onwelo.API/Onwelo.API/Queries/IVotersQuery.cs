using Onwelo.API.DTOs;

namespace Onwelo.API.Queries
{
    public interface IVotersQuery
    {
        Task<VoterDTO[]> GetVotersAsync(CancellationToken cancellationToken);
    }
}