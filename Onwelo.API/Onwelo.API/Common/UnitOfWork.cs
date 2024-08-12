using Onwelo.API.Database.Context;

namespace Onwelo.API.Common
{
    public class UnitOfWork(OnweloDbContext _context) : IUnitOfWork
    {
        public Task SaveChangesAsync(CancellationToken cancellationToken)
            => _context.SaveChangesAsync(cancellationToken);
    }
}