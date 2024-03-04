using AutoMapper;
using Przychodnia.Entities;
using Przychodnia.Models.JobPosition;

namespace Przychodnia
{
    public class JobPositionMappingProfile : Profile
    {
        public JobPositionMappingProfile()
        {
            CreateMap<JobPosition, JobPositionDto>();


            CreateMap<CreateJobPositionDto, JobPosition>();

            CreateMap<UpdateJobPositionDto, JobPosition>();

        }

    }
}
