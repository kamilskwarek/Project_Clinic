using System.ComponentModel.DataAnnotations;

namespace Przychodnia.Models.Patient
{
    public class CreatePatientDto
    {
        public int Id { get; set; }
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

        public DateTime BirthDate { get; set; }
        [Required]

        public string Gender { get; set; }

        // dane kontaktowe
        [Required]
        [MaxLength(14)]
        [Phone]

        public string PhoneNumber { get; set; }
        [Required]
        [MaxLength(50)]
        [EmailAddress]
        public string Email { get; set; }

        // adres zamieszkania
        [Required]
        [MaxLength(50)]
        public string City { get; set; }
        [Required]
        [MaxLength(50)]
        public string Street { get; set; }
        [Required]
        [MaxLength(10)]
        public string ApartmentNumber { get; set; }
        [Required]
        [MaxLength(10)]
        public string PostalCode { get; set; }


        // pytania o zdrowie tak/nie
        [Required]
        public bool Pregnant { get; set; }

        [MaxLength(100)]
        public string PregnantRemarks { get; set; }

        [Required]
        public bool Smoking { get; set; }

        [MaxLength(100)]
        public string SmokingRemarks { get; set; }

        [Required]
        public bool Alcohol { get; set; }

        [MaxLength(100)]
        public string AlcoholRemarks { get; set; }

        [Required]
        public bool SpecialDiet { get; set; }

        [MaxLength(100)]
        public string SpecialDietRemarks { get; set; }

        [Required]
        public bool Allergies { get; set; }

        [MaxLength(100)]
        public string AllergiesRemarks { get; set; }


        //pytania
        [MaxLength(250)]
        public string Medications { get; set; }

        [MaxLength(250)]
        public string Surgeries { get; set; }

        [Required]
        public bool Hospitalizations { get; set; }


        // historia rodziny
        [Required]
        public bool Asthma { get; set; }
        [Required]
        public bool HeartDisease { get; set; }
        [Required]
        public bool prostateCancer { get; set; }
        [Required]
        public bool Hypertension { get; set; }
        [Required]
        public bool Diabetes { get; set; }
        [Required]
        public bool BreastCancer { get; set; }
        [Required]
        public bool OvarianCancer { get; set; }
        [Required]
        public bool MetalIllness { get; set; }
        [Required]
        public bool Other { get; set; }
        [MaxLength(250)]
        public string OtherRemarks { get; set; }
    }
}
