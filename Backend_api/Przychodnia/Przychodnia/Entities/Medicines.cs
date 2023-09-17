using System.Security.Cryptography.X509Certificates;

namespace Przychodnia.Entities
{
    public class Medicines
    {
        public int Id { get; set; }
        public string MedicineName { get; set; }
        public string Dosage { get; set; }
        public string Duration { get; set; }

        public ICollection<MedicalPrescriptionMedicines> MedicalPrescriptionMedicines { get; set; }
    }
}
