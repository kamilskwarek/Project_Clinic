using AutoMapper;
using Przychodnia.Entities;
using Przychodnia.Models.Clinic;
using Przychodnia.Models.Patient;
namespace Przychodnia

{
    public class PatientMappingProfile : Profile
    {
        public PatientMappingProfile()
        {
            CreateMap<Patient, PatientDto>();


            CreateMap<CreatePatientDto, Patient>();

            CreateMap<UpdatePatientDto, Patient>();
        }
    }
}
