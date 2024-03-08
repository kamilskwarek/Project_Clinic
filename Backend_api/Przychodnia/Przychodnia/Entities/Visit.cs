namespace Przychodnia.Entities
{
    public class Visit
    {
        public int Id { get; set; }
        public DateTime VisitDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public string Notes { get; set; }

        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; }

        public int ClinicId { get; set; }
        public virtual Clinic Clinic { get; set; }


        public virtual SickLeave SickLeave { get; set; }

        public virtual MedicalPrescription MedicalPrescription { get; set; }
    }
}
