namespace Onwelo.API.Entities
{
    public class Candidate
    {
        public Candidate()
        {
        }

        private Candidate(Guid id, Person person)
        {
            Id = id;
            Person = person;
        }

        public Guid Id { get; init; }

        public virtual Person Person { get; init; } = default!;

        public Guid PersonId { get; init; }

        public virtual ICollection<Voter> Voters { get; init; } = default!;

        public static Candidate Create(
            Guid id,
            Person person
        ) => new(id, person);
    }
}