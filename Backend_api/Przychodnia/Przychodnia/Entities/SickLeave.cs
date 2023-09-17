namespace Przychodnia.Entities
{
    public class SickLeave
    {
        public int Id { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int VisitId { get; set; }
        public virtual Visit Visit { get; set; }

    }
}
