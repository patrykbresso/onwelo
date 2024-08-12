namespace Onwelo.API.DTOs
{
    public class VoterDTO
    {
        public string Fullname { get; init; } = default!;

        public bool HasVoted { get; init; }

        public Guid Id { get; init; }
    }
}