namespace Przychodnia.Models.Visit
{
    public class VisitDto
    {
        public int Id { get; set; }
        public DateTime VisitDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public string Notes { get; set; }

        public int EmployeeId { get; set; }
        public int PatientId { get; set; }

        public int ClinicId { get; set; }
    }
}
