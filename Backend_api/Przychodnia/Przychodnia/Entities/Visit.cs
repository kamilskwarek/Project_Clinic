namespace Przychodnia.Entities
{
    public class Visit
    {
        public int Id { get; set; }
        public DateTime VisitDate { get; set; }
        public TimeSpan VisitTime { get; set; }

        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; }



        public virtual SickLeave SickLeave { get; set; }

        public virtual MedicalPrescription MedicalPrescription { get; set; }
    }
}
