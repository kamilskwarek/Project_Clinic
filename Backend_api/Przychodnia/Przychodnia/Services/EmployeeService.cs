using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Przychodnia.Entities;
using Przychodnia.Models.Employee;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Przychodnia.Services
{
    public interface IEmployeeService
    {
        EmployeeDto GetById(int id);
        IEnumerable<EmployeeDto> GetAll();
        int Create(CreateEmployeeDto dto);
        bool Delete(int id);
        EmployeeDto GetByIdWithDetails(int id);
        bool Update(int id, UpdateEmployeeDto dto);
        int GetEmployeeIdByLastName(string lastName);
        string GenerateJwt(LoginDto dto);
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly ClinicDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IClinicService _clinicService;
        private readonly IJobPositionService _jobPositionService;
        private readonly IPasswordHasher<Employee> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IUserContextService _userContextService;

        public EmployeeService(ClinicDbContext dbContext, IMapper mapper, IClinicService clinicService, IJobPositionService jobPositionService, IPasswordHasher<Employee> passwordHasher, AuthenticationSettings authenticationSettings, IUserContextService userContextService) 
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _clinicService = clinicService;
            _jobPositionService = jobPositionService;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
            _userContextService = userContextService;
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

        public string GetEmployeeJobTitle()
        {
            var userId = _userContextService.GetUserId;
            if (userId.HasValue)
            {
                var employee = _dbContext.Employee
                    .Include(e => e.JobPosition)
                    .FirstOrDefault(e => e.Id == userId.Value);

                if (employee != null)
                {
                    return employee.JobPosition.JobTitle;
                }
            }
            return null;
        }


        public EmployeeDto GetById(int id)
        {
            var employee = _dbContext
                .Employee
                .Include(e => e.JobPosition)
                .Include(e => e.Clinic)
                .FirstOrDefault (c => c.Id == id);

            if (employee == null) return null;


            var result = _mapper.Map<EmployeeDto>(employee);

            result.JobPosition = employee.JobPosition?.JobTitle;
            result.Clinic = employee.Clinic?.Name;

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

            result.JobPosition = employee.JobPosition?.JobTitle;
            result.Clinic = employee.Clinic?.Name;

            return result;
        }


        public IEnumerable<EmployeeDto> GetAll()
        {
            var employees = _dbContext.Employee
                .Include(e => e.JobPosition)
                .Include(e => e.Clinic)
                .ToList();

            var employeeDtos = _mapper.Map<List<EmployeeDto>>(employees);

           
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

            var jobPosition = _jobPositionService.GetJobPositionByName(dto.JobTitle);
            if (jobPosition == null)
            {
                throw new Exception("Nieprawidłowa nazwa stanowiska.");
            }

            var employee = _mapper.Map<Employee>(dto);
            employee.Clinic = clinic;
            employee.JobPosition = jobPosition;


            var hashedPassword = _passwordHasher.HashPassword(employee, dto.PasswordHash);

            employee.PasswordHash = hashedPassword;


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
            if (!string.IsNullOrEmpty(dto.Email))
            {
                employee.Email = dto.Email;
            }
            if (!string.IsNullOrEmpty(dto.PasswordHash))
            {
                employee.PasswordHash = dto.PasswordHash;
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

        public int GetEmployeeIdByLastName(string lastName)
        {
            var employee = _dbContext.Employee.FirstOrDefault(e => e.LastName == lastName);
            return employee != null ? employee.Id : -1;
        }

        public string GenerateJwt(LoginDto dto)
        {


            var employee = _dbContext.Employee
                .Include(e => e.JobPosition)
                .FirstOrDefault(e => e.Email == dto.Email);
            if(employee is null)
            {
                return ("Nie prawidłowy email");
            }

            var result = _passwordHasher.VerifyHashedPassword(employee, employee.PasswordHash, dto.Password);
            if(result == PasswordVerificationResult.Failed)
            {
                return ("Nie prawidłowe hasło");

            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, employee.Id.ToString() ),
                new Claim(ClaimTypes.Name, $"{employee.FirstName} {employee.LastName}" ),
                new Claim(ClaimTypes.Role, $"{employee.JobPosition.JobTitle}" ),


            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.WriteToken(token);
        }

    }
}
