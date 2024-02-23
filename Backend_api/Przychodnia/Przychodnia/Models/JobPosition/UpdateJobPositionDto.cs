using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.JobPosition
{
    public class UpdateJobPositionDto
    {
       
        [MaxLength(50)]
        public string? JobTitle { get; set; }

        [MaxLength(500)]
        public string? JobDescription { get; set; }
    }
}
