using AutoMapper;
using Przychodnia.Entities;
using Przychodnia.Models.Visit;



namespace Przychodnia
{
    public class VisitMappingProfile : Profile
    {

        public VisitMappingProfile()
        { 
            CreateMap<Visit, VisitDto>()
                .ForMember(m => m.Employee, c=> c.MapFrom(s=>s.Employee.LastName))
                .ForMember(m => m.Patient, c => c.MapFrom(s => s.Patient.LastName));


            CreateMap<CreateVisitDto, Visit>()
                .ForMember(r => r.Employee, c => c.MapFrom(dto => new Employee { LastName = dto.Employee }))
                .ForMember(r => r.Patient, c => c.MapFrom(dto => new Patient { LastName = dto.Patient }));
            CreateMap<UpdateVisitDto, Visit>()
                .ForMember(r => r.Employee, c => c.MapFrom(dto => new Employee { LastName = dto.Employee }))
                .ForMember(r => r.Patient, c => c.MapFrom(dto => new Patient { LastName = dto.Patient }));
        }
    }
}
