using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Patient
{
    public class UpdatePatientDto
    {
        public int? Id { get; set; }

        [MaxLength(50)]

        public string? FirstName { get; set; }
        
        [MaxLength(50)]

        public string? LastName { get; set; }
        
        [MaxLength(11)]

        public string? Pesel { get; set; }
        

        public DateTime? BirthDate { get; set; }
        

        public string? Gender { get; set; }

        // dane kontaktowe
        
        [MaxLength(14)]
        [Phone]

        public string? PhoneNumber { get; set; }
        
        [MaxLength(50)]
        [EmailAddress]
        public string? Email { get; set; }

        // adres zamieszkania
        
        [MaxLength(50)]
        public string? City { get; set; }
        
        [MaxLength(50)]
        public string? Street { get; set; }
        
        [MaxLength(10)]
        public string? ApartmentNumber { get; set; }
        
        [MaxLength(10)]
        public string? PostalCode { get; set; }


        // pytania o zdrowie tak/nie
        
        public bool? Pregnant { get; set; }

        [MaxLength(100)]
        public string? PregnantRemakrs { get; set; }

        
        public bool? Smoking { get; set; }

        [MaxLength(100)]
        public string? SmokingRemakrs { get; set; }

        
        public bool? Alcohol { get; set; }

        [MaxLength(100)]
        public string? AlcoholRemakrs { get; set; }

        
        public bool? SpecialDiet { get; set; }

        [MaxLength(100)]
        public string? SpecialDietRemakrs { get; set; }

        
        public bool? Allergies { get; set; }

        [MaxLength(100)]
        public string? AllergiesRemakrs { get; set; }


        //pytania
        [MaxLength(250)]
        public string? Medications { get; set; }

        [MaxLength(250)]
        public string? Surgerys { get; set; }

        [MaxLength(250)]
        public string? Hospitalizations { get; set; }


        // historia rodziny
        
        public bool? Asthma { get; set; }
        
        public bool? HeartDisease { get; set; }
        
        public bool? ProstateCaner { get; set; }
        
        public bool? Hypertension { get; set; }
        
        public bool? Diabetes { get; set; }
        
        public bool? BreastCancer { get; set; }
        
        public bool? OvarianCancer { get; set; }
        
        public bool? MetalIllness { get; set; }
        
        public bool? Other { get; set; }
        [MaxLength(250)]
        public string? OtherRemarks { get; set; }
    }
}
