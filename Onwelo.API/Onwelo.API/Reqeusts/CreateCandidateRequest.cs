using System.ComponentModel.DataAnnotations;

namespace Onwelo.API.Reqeusts
{
    public class CreateCandidateRequest
    {
        [Required(ErrorMessage = "Fullname is required.")]
        public string Fullname { get; init; } = default!;
    }
}