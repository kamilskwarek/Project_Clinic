using AutoMapper;
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

        public VisitService(ClinicDbContext dbContext, IMapper mapper, IEmployeeService employeService, IPatientService patientService)
        {
            _dbcontext = dbContext;
            _mapper = mapper;
            _employeeService = employeService;
            _patientService = patientService;
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
                .FirstOrDefault(v => v.Id == id);
            if (visit == null) return null;
            var result = _mapper.Map<VisitDto>(visit);

            result.Employee = visit.Employee?.LastName;
            result.Patient = visit.Patient?.LastName;

            return result;
        }


        public IEnumerable<VisitDto> GetAll()
        {
            var visits = _dbcontext.Visits
                .Include(e => e.Employee)
                .Include(e => e.Patient)
                .ToList();

            var visitDtos = _mapper.Map<List<VisitDto>>(visits);

            foreach (var visitsDto in visitDtos)
            {
                visitsDto.Employee = visits.FirstOrDefault(v => v.Id == visitsDto.Id)?.Employee?.LastName;
                visitsDto.Patient = visits.FirstOrDefault(v => v.Id == visitsDto.Id)?.Patient?.LastName;

            }
            return visitDtos;
        }

        public int Create(CreateVisitDto dto)
        {
            var employee = _dbcontext.Employee.FirstOrDefault(e => e.LastName == dto.Employee);
            var patient = _dbcontext.Patient.FirstOrDefault(p => p.LastName == dto.Patient);

            if(employee == null)
            {
                throw new Exception("Nieprawidłowe nazwisko pracownika");
            }

            if (patient == null)
            {
                throw new Exception("Nieprawidłowe nazwisko pacjenta");
            }

            var visit = _mapper.Map<Visit>(dto);
            visit.Employee = employee;
            visit.Patient = patient;
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
            if(!string.IsNullOrEmpty(dto.Employee))
            {
                var employee = _dbcontext.Employee.FirstOrDefault(e => e.LastName == dto.Employee);
                if(employee == null)
                {
                    throw new Exception("Nieprawidłowy pracownik");
                }
                visit.Employee = employee;
            }
            if (!string.IsNullOrEmpty(dto.Patient))
            {
                var patient = _dbcontext.Patient.FirstOrDefault(p => p.LastName == dto.Patient);
                if (patient == null)
                {
                    throw new Exception("Nieprawidłowy pacjent.");
                }
                visit.Patient = patient;
            }
            _dbcontext.SaveChanges();
            return true;
        }
    }
   
}
