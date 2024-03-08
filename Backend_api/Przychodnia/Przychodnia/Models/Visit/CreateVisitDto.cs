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
        public int EmployeeId { get; set; }
        public int PatientId { get; set; }
        public int ClinicId { get; set; }
    }
}
