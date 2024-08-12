using Onwelo.API.Entities;

namespace Onwelo.API.Repositories
{
    public interface IVotersRepository
    {
        Task<Guid> CreateVoterAsync(string fullName, CancellationToken cancellationToken);

        Task<Voter> FindVoterAsync(Guid voterId, CancellationToken cancellationToken);
    }
}