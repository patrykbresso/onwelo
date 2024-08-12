namespace Onwelo.API.Entities
{
    public class Voter
    {
        public Voter()
        {
        }

        private Voter(Guid id, Person person)
        {
            Id = id;
            Person = person;
        }

        public virtual Candidate? Candidate { get; init; } = default!;

        public Guid? CandidateId { get; private set; }

        public Guid Id { get; init; }

        public virtual Person Person { get; init; } = default!;

        public Guid PersonId { get; init; }

        public static Voter Create(
            Guid id,
            Person person
        ) => new(id, person);

        public void PlaceVote(Guid candidateId)
        {
            if (CandidateId is not null) throw new InvalidOperationException($"Voter with {Id} already voted.");

            CandidateId = candidateId;
        }
    }
}