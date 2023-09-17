namespace Przychodnia.Entities
{
    public class Clinic
    {

        public int Id { get; set; }
        public string Name {get; set;}
        public string Description { get; set;}
        public string ContactEmail { get; set;}
        public string ContactNumber { get; set;}

        //address
        public string City { get; set; }
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string PostalCode { get; set; }

    }
}
