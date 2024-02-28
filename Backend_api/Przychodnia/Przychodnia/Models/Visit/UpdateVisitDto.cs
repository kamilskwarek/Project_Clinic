using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Visit
{
    public class UpdateVisitDto
    {

        public DateTime VisitDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        [MaxLength(500)]

        public string Notes { get; set; }
        public string Employee { get; set; }
        public string Patient { get; set; }
    
    }
}
