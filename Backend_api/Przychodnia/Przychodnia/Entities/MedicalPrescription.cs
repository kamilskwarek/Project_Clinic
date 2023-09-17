namespace Przychodnia.Entities
{
    public class MedicalPrescription
    {
        public int Id { get; set; }

        public string Recommendations { get; set; }

        public int VisitId { get; set; }
        public virtual Visit Visit { get; set; }

         public ICollection<MedicalPrescriptionMedicines> MedicalPrescriptionMedicines { get; set; }

    }
}
