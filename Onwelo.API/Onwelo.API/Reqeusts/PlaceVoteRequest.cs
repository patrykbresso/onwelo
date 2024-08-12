namespace Onwelo.API.Reqeusts
{
    public class PlaceVoteRequest
    {
        public Guid CandidateId { get; init; }

        public Guid VoterId { get; set; }
    }
}