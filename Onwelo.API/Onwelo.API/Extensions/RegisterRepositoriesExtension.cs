using Onwelo.API.Repositories;

namespace Onwelo.API.Extensions
{
    public static class RegisterRepositoriesExtension
    {
        public static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<ICandidatesRepository, CandidatesRepository>();
            services.AddScoped<IVotersRepository, VotersRepository>();

            return services;
        }
    }
}