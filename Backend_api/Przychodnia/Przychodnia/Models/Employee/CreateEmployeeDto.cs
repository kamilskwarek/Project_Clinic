using Przychodnia.Entities;
using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Employee
{
    public class CreateEmployeeDto
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(11)]
        public string Pesel { get; set; }
        [Required]
        [MaxLength(14)]
        [Phone]
        public string PhoneNumber { get; set; }
        public string JobTitle { get; set; }
        public string ClinicName { get; set; }

    }
}
