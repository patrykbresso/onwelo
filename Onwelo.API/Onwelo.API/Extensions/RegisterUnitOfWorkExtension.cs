using Onwelo.API.Common;

namespace Onwelo.API.Extensions
{
    public static class RegisterUnitOfWorkExtension
    {
        public static IServiceCollection RegisterUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}