using AutoMapper;
using Przychodnia.Entities;
using Przychodnia.Models.Employee;

namespace Przychodnia
{
    public class EmployeeMappingProfile : Profile
    {
        public EmployeeMappingProfile()
        {
            CreateMap<Employee, EmployeeDto>()
                .ForMember(m => m.JobPosition, c => c.MapFrom(s => s.JobPosition.JobTitle))
                .ForMember(m => m.Clinic, c => c.MapFrom(s => s.Clinic.Name));



            CreateMap<CreateEmployeeDto, Employee>()
                    .ForMember(r => r.JobPosition, c => c.MapFrom(dto => new JobPosition { JobTitle = dto.JobTitle }))
                    .ForMember(r => r.Clinic, c => c.MapFrom(dto => new Clinic { Name = dto.ClinicName }));

            CreateMap<UpdateEmployeeDto, Employee>()
                    .ForMember(r => r.JobPosition, c => c.MapFrom(dto => new JobPosition { JobTitle = dto.JobTitle }))
                    .ForMember(r => r.Clinic, c => c.MapFrom(dto => new Clinic { Name = dto.ClinicName }));
        }

        
    }
}
