namespace Przychodnia.Models.Visit
{
    public class VisitDto
    {
        public int Id { get; set; }
        public DateTime VisitDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public string Notes { get; set; }

        public string Employee { get; set; }

        public string Patient { get; set; }
    }
}
