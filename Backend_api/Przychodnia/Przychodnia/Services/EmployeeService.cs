using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Przychodnia.Entities;
using Przychodnia.Models.Employee;

namespace Przychodnia.Services
{
    public interface IEmployeeService { 
        EmployeeDto GetById(int id);
        IEnumerable<EmployeeDto> GetAll();
        int Create(CreateEmployeeDto dto);
        bool Delete(int id);
        EmployeeDto GetByIdWithDetails(int id);
        bool Update(int id, UpdateEmployeeDto dto);
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly ClinicDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IClinicService _clinicService;


        public EmployeeService(ClinicDbContext dbContext, IMapper mapper, IClinicService clinicService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _clinicService = clinicService;
        }

        public bool Delete(int id)
        {
            var employee = _dbContext
                .Employee
                .FirstOrDefault(c => c.Id == id);
            if(employee == null) return false;
            _dbContext .Employee .Remove(employee);
            _dbContext.SaveChanges();
            return true;
        }

        public EmployeeDto GetById(int id)
        {
            var employee = _dbContext
                .Employee
                .FirstOrDefault (c => c.Id == id);
            if (employee == null) return null;
            var result = _mapper.Map<EmployeeDto>(employee);
   
            return result;
        }

        public EmployeeDto GetByIdWithDetails(int id)
        {
            var employee = _dbContext.Employee
                .Include(e => e.JobPosition)
                .Include(e => e.Clinic)
                .FirstOrDefault(c => c.Id == id);

            if (employee == null) return null;

            var result = _mapper.Map<EmployeeDto>(employee);

            // Przypisz nazwy JobPosition i Clinic do EmployeeDto
            result.JobPosition = employee.JobPosition?.JobTitle; // Sprawdzamy, czy JobPosition nie jest null
            result.Clinic = employee.Clinic?.Name; // Sprawdzamy, czy Clinic nie jest null

            return result;
        }


        public IEnumerable<EmployeeDto> GetAll()
        {
            var employees = _dbContext.Employee
                .Include(e => e.JobPosition)
                .Include(e => e.Clinic)
                .ToList();

            var employeeDtos = _mapper.Map<List<EmployeeDto>>(employees);

            // Przypisz nazwy JobPosition i Clinic do każdego EmployeeDto w liście
            foreach (var employeeDto in employeeDtos)
            {
                employeeDto.JobPosition = employees.FirstOrDefault(e => e.Id == employeeDto.Id)?.JobPosition?.JobTitle;
                employeeDto.Clinic = employees.FirstOrDefault(e => e.Id == employeeDto.Id)?.Clinic?.Name;
            }

            return employeeDtos;
        }


        public int Create(CreateEmployeeDto dto)
        {
            var clinic = _clinicService.GetClinicByName(dto.ClinicName);
            if (clinic == null)
            {
                throw new Exception("Nieprawidłowa nazwa kliniki.");
            }

            var employee = _mapper.Map<Employee>(dto);
            employee.Clinic = clinic;
            _dbContext.Employee .Add(employee);
            _dbContext.SaveChanges ();
            return employee.Id;
        }

        public bool Update(int id, UpdateEmployeeDto dto)
        {
            var employee = _dbContext.Employee.FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                throw new Exception("Nieprawidłowe id pracownika.");
            }

            if (!string.IsNullOrEmpty(dto.FirstName))
            {
                employee.FirstName = dto.FirstName;
            }

            if (!string.IsNullOrEmpty(dto.LastName))
            {
                employee.LastName = dto.LastName;
            }

            if (!string.IsNullOrEmpty(dto.Pesel))
            {
                employee.Pesel = dto.Pesel;
            }

            if (!string.IsNullOrEmpty(dto.PhoneNumber))
            {
                employee.PhoneNumber = dto.PhoneNumber;
            }

            if (!string.IsNullOrEmpty(dto.JobTitle))
            {
                var jobPosition = _dbContext.jobPositions.FirstOrDefault(jp => jp.JobTitle == dto.JobTitle);
                if (jobPosition == null)
                {
                    throw new Exception("Nieprawidłowy tytuł stanowiska.");
                }
                employee.JobPosition = jobPosition;
            }


            if (!string.IsNullOrEmpty(dto.ClinicName))
            {
                var clinic = _clinicService.GetClinicByName(dto.ClinicName);
                if (clinic == null)
                {
                    throw new Exception("Nieprawidłowa nazwa kliniki.");
                }
                employee.Clinic = clinic;
            }

            _dbContext.SaveChanges();
            return true;
        }



    }
}
