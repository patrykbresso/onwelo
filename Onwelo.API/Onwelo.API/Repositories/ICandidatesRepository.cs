namespace Onwelo.API.Repositories
{
    public interface ICandidatesRepository
    {
        Task<Guid> CreateCandidateAsync(string fullName, CancellationToken cancellationToken);
    }
}