namespace Onwelo.API.Entities
{
    public class Candidate
    {
        //There are two ways in which we can handle counting number of votes for particular Candidate,
        //first one is just checking number of relationships between Candidate and Voter (its implemented this way)
        //second one is just to create another column in Candidate with sum of votes
        //second solution is more suitable if we assume that the database will have a lot of records
        //second solution unfortunately can lead to inconsistency in data
        //in case of small datasets first approach should be ok
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