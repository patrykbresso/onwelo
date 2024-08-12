namespace Onwelo.API.Entities
{
    public class Person
    {
        private Person(Guid id, string fullName)
        {
            Id = id;
            FullName = fullName;
        }

        public virtual Candidate? Candidate { get; init; }

        public string FullName { get; init; } = default!;

        public Guid Id { get; init; }

        public virtual Voter? Voter { get; init; }

        public static Person Create(
            Guid id,
            string fullname
        ) => new(id, fullname);
    }
}