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


            CreateMap<CreateJobPosiotionDto, JobPosition>();

            CreateMap<UpdateJobPositionDto, JobPosition>();

        }

    }
}
