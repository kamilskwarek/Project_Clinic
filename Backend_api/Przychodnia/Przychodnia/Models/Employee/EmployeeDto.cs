using Przychodnia.Entities;
using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Employee
{
    public class EmployeeDto
    {

        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public string PhoneNumber { get; set; }

        public string JobPosition { get; set; }

        public string Clinic { get; set; }

    }
}
