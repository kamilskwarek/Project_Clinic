using AutoMapper;
using Przychodnia.Entities;
using Przychodnia.Models.Clinic;

namespace Przychodnia
{
    public class ClinicMappingProfile : Profile
    {
        public ClinicMappingProfile()
        {
            CreateMap<Clinic, ClinicDto>();


            CreateMap<CreateClinicDto, Clinic>();

            CreateMap<UpdateClinicDto, Clinic>();

        }

    }
}
