using Microsoft.AspNetCore.Mvc;
using Onwelo.API.Common;
using Onwelo.API.DTOs;
using Onwelo.API.Entities;
using Onwelo.API.Queries;
using Onwelo.API.Repositories;
using Onwelo.API.Reqeusts;

namespace Onwelo.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VotersController(
        IVotersQuery _votersQuery,
        IVotersRepository _votersRepository,
        IUnitOfWork _unitOfWork) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> CreateVoterAsync([FromBody] CreateVoterRequest request, CancellationToken cancellationToken)
        {
            Guid voterId = await _votersRepository.CreateVoterAsync(request.Fullname, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Ok(voterId);
        }

        [HttpGet]
        public async Task<VoterDTO[]> GetCandidatesAsync(CancellationToken cancellationToken)
        {
            return await _votersQuery.GetVotersAsync(cancellationToken);
        }

        [HttpPut]
        public async Task<IActionResult> PlaceVoteAsync([FromBody] PlaceVoteRequest request, CancellationToken cancellationToken)
        {
            Voter voter = await _votersRepository.FindVoterAsync(request.VoterId, cancellationToken);
            voter.PlaceVote(request.CandidateId);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}