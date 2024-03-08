using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Przychodnia.Entities;
using Przychodnia.Models.Visit;

namespace Przychodnia.Services
{
    public interface IVisitService
    {
        VisitDto GetById(int id);
        IEnumerable<VisitDto> GetAll();
        int Create(CreateVisitDto dto);
        bool Delete(int id);
        VisitDto GetByIdWithDetails(int id);
        bool Update(int id, UpdateVisitDto dto);

    }

    public class VisitService : IVisitService
    {
        private readonly IMapper _mapper;
        private readonly ClinicDbContext _dbcontext;
        private readonly IEmployeeService _employeeService;
        private readonly IPatientService _patientService;
        private readonly IClinicService _clinicalService;
        private readonly ILogger _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserContextService _userContextService;

        public VisitService(ClinicDbContext dbContext, IMapper mapper, IEmployeeService employeService, IPatientService patientService, IClinicService clinicalService)
        {
            _dbcontext = dbContext;
            _mapper = mapper;
            _employeeService = employeService;
            _patientService = patientService;
            _clinicalService = clinicalService;
        }

        public bool Delete(int id)
        {
            var visit = _dbcontext
                .Visits
                .FirstOrDefault(v => v.Id == id);
            if(visit == null) return false;
            _dbcontext .Visits .Remove(visit);
            _dbcontext .SaveChanges();
            return true;
        }

        public VisitDto GetById(int id)
        {
            var visit = _dbcontext
                .Visits
                .FirstOrDefault(v => v.Id == id);
            if (visit == null) return null;
            var result = _mapper.Map<VisitDto>(visit);
            return result;

        }

        public VisitDto GetByIdWithDetails(int id)
        {
            var visit = _dbcontext.Visits
                .Include(e =>e.Employee)
                .Include(e =>e.Patient)
                .Include(e =>e.Clinic)
                .FirstOrDefault(v => v.Id == id);
            if (visit == null) return null;
            var result = _mapper.Map<VisitDto>(visit);

            result.EmployeeId = visit.EmployeeId;
            result.PatientId = visit.PatientId;
            result.ClinicId = visit.ClinicId;

            return result;
        }


        public IEnumerable<VisitDto> GetAll()
        {
            var visits = _dbcontext.Visits
                .Include(e => e.Employee)
                .Include(e => e.Patient)
                .Include(e => e.Clinic)
                .ToList();

            var visitDtos = _mapper.Map<List<VisitDto>>(visits);

            foreach (var visitDto in visitDtos)
            {
                visitDto.EmployeeId = visitDto.EmployeeId;
                visitDto.PatientId = visitDto.PatientId;
                visitDto.ClinicId = visitDto.ClinicId;
            }
            return visitDtos;
        }

        public int Create(CreateVisitDto dto)
        {

            var employeeId = dto.EmployeeId;
            var patientId = dto.PatientId;
            var clinicId = dto.ClinicId;

            var employee = _dbcontext.Employee.FirstOrDefault(e => e.Id == dto.EmployeeId);
            var patient = _dbcontext.Patient.FirstOrDefault(p => p.Id == dto.PatientId); 
            var clinic = _dbcontext.Clinic.FirstOrDefault(c => c.Id == dto.ClinicId);

            if(employee == null)
            {
                throw new Exception("Nieprawidłowe nazwisko pracownika");
            }

            if (patient == null)
            {
                throw new Exception("Nieprawidłowe nazwisko pacjenta");
            }

            if (clinic == null)
            {
                throw new Exception("Nieprawidłowa nawza placówki");
            }

            var visit = _mapper.Map<Visit>(dto);
            visit.EmployeeId = employeeId;
            visit.PatientId = patientId;
            visit.ClinicId=clinicId;
            _dbcontext.Visits.Add(visit);
            _dbcontext.SaveChanges();

            return visit.Id;



        }


        public bool Update(int id, UpdateVisitDto dto)
        {
            var visit = _dbcontext.Visits.FirstOrDefault(v => v.Id == id);
            if (visit == null)
            {
                throw new Exception("Brak takiej wizyty");
            }

            if(dto.VisitDate != default)
            {
                visit.VisitDate = dto.VisitDate;
            }
            if (dto.StartTime != default)
            {
                visit.StartTime = dto.StartTime;
            }

            if (dto.EndTime != default)
            {
                visit.EndTime = dto.EndTime;
            }
            if(!string.IsNullOrEmpty(dto.Notes))
            {
                visit.Notes = dto.Notes;
            }
            if (dto.EmployeeId != 0)
            {
                var employee = _dbcontext.Employee.FirstOrDefault(e => e.Id == dto.EmployeeId);
                if (employee == null)
                {
                    throw new Exception("Nieprawidłowy pracownik");
                }
                visit.EmployeeId = dto.EmployeeId;
            }

            if (dto.PatientId != 0)
            {
                var patient = _dbcontext.Patient.FirstOrDefault(p => p.Id == dto.PatientId);
                if (patient == null)
                {
                    throw new Exception("Nieprawidłowy pacjent");
                }
                visit.PatientId = dto.PatientId;
            }

            if (dto.ClinicId != 0)
            {
                var clinic = _dbcontext.Clinic.FirstOrDefault(p => p.Id == dto.ClinicId);
                if (clinic == null)
                {
                    throw new Exception("Nieprawidłowy placówka");
                }
                visit.ClinicId = dto.ClinicId;
            }
            _dbcontext.SaveChanges();
            return true;
        }
    }
   
}
