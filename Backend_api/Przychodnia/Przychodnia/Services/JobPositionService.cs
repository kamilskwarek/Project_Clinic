﻿using AutoMapper;
using Przychodnia.Entities;
using Przychodnia.Models.JobPosition;
using Microsoft.AspNetCore.Authorization;


namespace Przychodnia.Services
{
    public interface IJobPositionService
    { 

        JobPositionDto GetById(int id);
        IEnumerable<JobPositionDto> GetAll();
        int Create(CreateJobPositionDto dto);
        JobPosition GetJobPositionByName(string jobName);
        bool Delete(int id);
        bool Update(int od, UpdateJobPositionDto dto);
    
    }

    public class JobPositionService : IJobPositionService
    {
        private readonly ClinicDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserContextService _userContextService;


        public JobPositionService(ClinicDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public bool Delete(int id)
        {
            var jobPosition = _dbContext
                .jobPositions
                .FirstOrDefault(p => p.Id == id);
            if(jobPosition == null) return false;
            _dbContext .jobPositions.Remove(jobPosition);
            _dbContext.SaveChanges();
            return true;
        }

        public JobPositionDto GetById(int id)
        {
            var jobPosition = _dbContext
                .jobPositions
                .FirstOrDefault(p => p.Id == id);
            if (jobPosition == null) return null;
            var result = _mapper.Map<JobPositionDto>(jobPosition);
            return result;

        }

        public IEnumerable<JobPositionDto> GetAll()
        {
            var jobPosition = _dbContext
            .jobPositions
            .ToList();
            var jobPositionDtos = _mapper.Map<List<JobPositionDto>>(jobPosition);
            return jobPositionDtos;
        }


        public int Create(CreateJobPositionDto dto)
        {
            var jobPosition = _mapper.Map<JobPosition>(dto);
            _dbContext.jobPositions.Add(jobPosition);
            _dbContext.SaveChanges();
            return jobPosition.Id;
        }

        public JobPosition GetJobPositionByName(string jobName)
        {
            return _dbContext.jobPositions.FirstOrDefault(c => c.JobTitle == jobName);
        }

        public bool Update(int id, UpdateJobPositionDto dto)
        {
            var jobPosition = _dbContext.jobPositions.FirstOrDefault(j => j.Id == id);
            if(jobPosition == null)
            {
                throw new Exception("Nieprawidłowe id stanowiska");
            }
            if(!string.IsNullOrEmpty(dto.JobTitle))
            {
                jobPosition.JobTitle = dto.JobTitle;
            }
            if (!string.IsNullOrEmpty(dto.JobDescription))
            {
                jobPosition.JobDescription = dto.JobDescription;
            }

            _dbContext.SaveChanges();
            return true;
        }
    }

}
