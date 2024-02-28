using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Visit
{
    public class CreateVisitDto
    {
        [Required]
        public DateTime VisitDate { get; set; }
        [Required]
        public TimeSpan StartTime { get; set; }
        [Required]
        public TimeSpan EndTime { get; set; }
        public string Notes { get; set; }
        public string Employee { get; set; }
        public string Patient { get; set; }
    }
}
