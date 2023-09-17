namespace Przychodnia.Entities
{
    public class MedicalPrescriptionMedicines
    {
        public int Id { get; set; }

        public int MedicalPrescriptionId { get; set; }
        public virtual MedicalPrescription MedicalPrescription { get; set; }

        public int MedicinesId { get; set; }
        public virtual Medicines Medicines { get; set; }
    }
}
