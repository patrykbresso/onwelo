using Microsoft.EntityFrameworkCore;
using Onwelo.API.Database.Context;
using Onwelo.API.Entities;

namespace Onwelo.API.Repositories
{
    public class VotersRepository(OnweloDbContext _context) : IVotersRepository
    {
        public async Task<Guid> CreateVoterAsync(string fullName, CancellationToken cancellationToken)
        {
            Person person = Person.Create(Guid.NewGuid(), fullName);
            Voter voter = Voter.Create(Guid.NewGuid(), person);

            await _context.Voters.AddAsync(voter, cancellationToken);

            return voter.Id;
        }

        public async Task<Voter> FindVoterAsync(Guid voterId, CancellationToken cancellationToken)
            => await _context.Voters.FirstAsync(x => x.Id == voterId, cancellationToken);
    }
}