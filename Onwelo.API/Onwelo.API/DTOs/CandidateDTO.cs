namespace Onwelo.API.DTOs
{
    public class CandidateDTO
    {
        public string Fullname { get; init; } = default!;

        public Guid Id { get; init; }

        public int NumberOfVotes { get; init; }
    }
}