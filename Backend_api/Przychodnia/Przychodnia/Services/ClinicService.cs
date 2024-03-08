using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Przychodnia.Entities;
using Przychodnia.Models.Clinic;


namespace Przychodnia.Services
{

    public interface IClinicService
    {
        ClinicDto GetById(int id);
        IEnumerable<ClinicDto> GetAll();
        int Create(CreateClinicDto dto);
        bool Delete(int id);
        Clinic GetClinicByName(string clinicName);
        bool Update(int id, UpdateClinicDto dto);

    }
    public class ClinicService : IClinicService
    {
        private readonly ClinicDbContext _dbcontext;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserContextService _userContextService;

        public ClinicService(ClinicDbContext dbcontext, IMapper mapper, ILogger<ClinicService> logger, IAuthorizationService authorizationService, IUserContextService userContextService)
        {
            _dbcontext = dbcontext;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _userContextService = userContextService;
        }

        public bool Delete(int id)
        {
            var clinic = _dbcontext
               .Clinic
               .FirstOrDefault(c => c.Id == id);

            if (clinic == null) return false;


            _dbcontext.Clinic .Remove(clinic);
            _dbcontext.SaveChanges();
            return true;
        }


        public ClinicDto GetById( int id)
        {
            var clinic = _dbcontext
                .Clinic
                .FirstOrDefault(c => c.Id == id);

            if (clinic == null) return null;
            var result = _mapper.Map<ClinicDto>(clinic);

            return result;
        }

        public IEnumerable<ClinicDto> GetAll()
        {
            var clinic = _dbcontext
              .Clinic
              .ToList();

            var ClinicsDtos =_mapper.Map<List<ClinicDto>>(clinic);

            return ClinicsDtos;
        }

        public int Create(CreateClinicDto dto)
        {
            var clinic = _mapper.Map<Clinic>(dto);
            _dbcontext.Clinic.Add(clinic);
            _dbcontext.SaveChanges();
            return clinic.Id;
        }
        public Clinic GetClinicByName(string clinicName)
        {
            return _dbcontext.Clinic.FirstOrDefault(c => c.Name == clinicName);
        }

        public bool Update(int id, UpdateClinicDto dto)
        {
            var clinic = _dbcontext.Clinic.FirstOrDefault(c => c.Id == id);
            if( clinic == null)
            {
                throw new Exception("Nieprawidłowe id kliniki");
            }

            if (!string.IsNullOrEmpty(dto.Name))
            {
                clinic.Name = dto.Name;
            }

            if (!string.IsNullOrEmpty(dto.Description))
            {
                clinic.Description = dto.Description;
            }

            if (!string.IsNullOrEmpty(dto.ContactEmail))
            {
                clinic.ContactEmail = dto.ContactEmail;
            }

            if (!string.IsNullOrEmpty(dto.City))
            {
                clinic.City = dto.City;
            }

            if (!string.IsNullOrEmpty(dto.Street))
            {
                clinic.Street = dto.Street;
            }

            if (!string.IsNullOrEmpty(dto.BuildingNumber))
            {
                clinic.BuildingNumber = dto.BuildingNumber;
            }

            if (!string.IsNullOrEmpty(dto.PostalCode))
            {
                clinic.PostalCode = dto.PostalCode;
            }

            _dbcontext.SaveChanges();
            return true;
        }
    }
}
