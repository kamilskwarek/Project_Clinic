namespace Przychodnia.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }


        public int JobPositionId { get; set; }
        public virtual JobPosition JobPosition { get; set; }
        public int ClinicId { get; set; }
        public virtual Clinic Clinic { get; set; }

    }
}
