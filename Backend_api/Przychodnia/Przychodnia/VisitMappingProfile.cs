using AutoMapper;
using Przychodnia.Entities;
using Przychodnia.Models.Visit;
using Przychodnia.Services;


namespace Przychodnia
{
    public class VisitMappingProfile : Profile
    {
        public VisitMappingProfile()
        {
            CreateMap<Visit, VisitDto>();

            CreateMap<CreateVisitDto, Visit>();

            CreateMap<UpdateVisitDto, Visit>();

            CreateMap<Visit, VisitDto>()
                .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.EmployeeId))
                .ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.PatientId))
                .ForMember(dest => dest.ClinicId, opt => opt.MapFrom(src => src.ClinicId));
            
        }
    }
}
