namespace Przychodnia.Models.Patient
{
    public class PatientDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }

        public DateTime BirthDate { get; set; }

        public string Gender { get; set; }

        // dane kontaktowe
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        // adres zamieszkania
        public string City { get; set; }
        public string Street { get; set; }
        public string ApartmentNumber { get; set; }
        public string PostalCode { get; set; }


        // pytania o zdrowie tak/nie
        public bool Pregnant { get; set; }
        public string PregnantRemakrs { get; set; }

        public bool Smoking { get; set; }
        public string SmokingRemakrs { get; set; }

        public bool Alcohol { get; set; }
        public string AlcoholRemakrs { get; set; }

        public bool SpecialDiet { get; set; }
        public string SpecialDietRemakrs { get; set; }

        public bool Allergies { get; set; }
        public string AllergiesRemakrs { get; set; }


        //pytania
        public string Medications { get; set; }

        public string Surgerys { get; set; }

        public string Hospitalizations { get; set; }


        // historia rodziny
        public bool Asthma { get; set; }
        public bool HeartDisease { get; set; }
        public bool ProstateCaner { get; set; }
        public bool Hypertension { get; set; }
        public bool Diabetes { get; set; }
        public bool BreastCancer { get; set; }
        public bool OvarianCancer { get; set; }
        public bool MetalIllness { get; set; }

        public bool Other { get; set; }
        public string OtherRemarks { get; set; }
    }
}
