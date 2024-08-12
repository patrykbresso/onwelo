using Onwelo.API.Database.Context;
using Onwelo.API.Entities;

namespace Onwelo.API.Repositories
{
    public class CandidatesRepository(OnweloDbContext _context) : ICandidatesRepository
    {
        public async Task<Guid> CreateCandidateAsync(string fullName, CancellationToken cancellationToken)
        {
            Person person = Person.Create(Guid.NewGuid(), fullName);
            Candidate candidate = Candidate.Create(Guid.NewGuid(), person);

            await _context.Candidates.AddAsync(candidate, cancellationToken);

            return candidate.Id;
        }
    }
}