using Microsoft.AspNetCore.Mvc;
using Onwelo.API.Common;
using Onwelo.API.DTOs;
using Onwelo.API.Queries;
using Onwelo.API.Repositories;
using Onwelo.API.Reqeusts;

namespace Onwelo.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CandidatesController(
        ICandidatesQuery _candidatesQuery,
        ICandidatesRepository _candidatesRepository,
        IUnitOfWork _unitOfWork) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> CreateCandidateAsync([FromBody] CreateCandidateRequest request, CancellationToken cancellationToken)
        {
            Guid candidateId = await _candidatesRepository.CreateCandidateAsync(request.Fullname, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Ok(candidateId);
        }

        [HttpGet]
        public async Task<CandidateDTO[]> GetCandidatesAsync(CancellationToken cancellationToken)
        {
            return await _candidatesQuery.GetCandidatesAsync(cancellationToken);
        }
    }
}