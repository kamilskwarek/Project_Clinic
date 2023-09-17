using Przychodnia.Entities;
using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Employee
{
    public class UpdateEmployeeDto
    {
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        [MaxLength(11)]
        public string? Pesel { get; set; }

        [MaxLength(14)]
        [Phone]
        public string? PhoneNumber { get; set; }

        public string? JobTitle { get; set; }
        public string? ClinicName { get; set; }
    }


}
