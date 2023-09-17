namespace Przychodnia.Entities
{
    public class Vaccinations
    {
        public int Id { get; set; }
        public string VaccinName { get; set; }
        public DateTime VaccinationDate { get; set; }

        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; }
    }
}
