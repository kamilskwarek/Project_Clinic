using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Clinic
{
    public class CreateClinicDto
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
        [Required]
        [MaxLength(50)]
        [EmailAddress]
        public string ContactEmail { get; set; }
        [Required]
        [MaxLength(14)]
        [Phone]
        public string ContactNumber { get; set; }

        //address
        [Required]
        [MaxLength(50)]
        public string City { get; set; }
        [Required]
        [MaxLength(50)]
        public string Street { get; set; }
        [Required]
        [MaxLength(10)]
        public string BuildingNumber { get; set; }
        [Required]
        [MaxLength(10)]
        public string PostalCode { get; set; }
    }
}
