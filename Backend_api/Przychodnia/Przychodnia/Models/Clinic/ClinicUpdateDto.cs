using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Clinic
{
    public class UpdateClinicDto
    {

        [MaxLength(50)]
        public string? Name { get; set; }
        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(50)]
        [EmailAddress]
        public string? ContactEmail { get; set; }

        [MaxLength(14)]
        [Phone]
        public string? ContactNumber { get; set; }

        //address

        [MaxLength(50)]
        public string? City { get; set; }

        [MaxLength(50)]
        public string? Street { get; set; }

        [MaxLength(10)]
        public string? BuildingNumber { get; set; }

        [MaxLength(10)]
        public string? PostalCode { get; set; }
    }
}
