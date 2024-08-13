using System.ComponentModel.DataAnnotations;

namespace Onwelo.API.Reqeusts
{
    public class PlaceVoteRequest
    {
        [Required(ErrorMessage = "CandidateId is required.")]
        public Guid CandidateId { get; init; }

        [Required(ErrorMessage = "VoterId is required.")]
        public Guid VoterId { get; set; }
    }
}