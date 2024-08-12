using Onwelo.API.Entities;
using Onwelo.API.Queries;

namespace Onwelo.API.Extensions
{
    public static class RegisterQueriesExtension
    {
        public static IServiceCollection RegisterQueries(this IServiceCollection services)
        {
            services.AddScoped<ICandidatesQuery, CandidatesQuery>();
            services.AddScoped<IVotersQuery, VotersQuery>();

            return services;
        }
    }
}