using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.JobPosition
{
    public class CreateJobPosiotionDto
    {
        [Required]
        [MaxLength(50)]
        public string JobTitle { get; set; }
        
        [MaxLength(500)]
        public string JobDescription { get; set; }
    }
}
