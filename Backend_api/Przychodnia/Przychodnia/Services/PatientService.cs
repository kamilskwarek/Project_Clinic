using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Przychodnia.Entities;
using Przychodnia.Models.Patient;

namespace Przychodnia.Services
{
    public interface IPatientService
    {
        PatientDto GetById(int id);
        IEnumerable<PatientDto> GetAll();
        int Create(CreatePatientDto dti);
        bool Delete(int id);
        bool Update(int id, UpdatePatientDto dto);
        int GetPatientIdByLastName(string lastName);
    }

    public class PatientService : IPatientService 
    {
        private readonly ClinicDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserContextService _userContextService;

        public PatientService(ClinicDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public bool Delete(int id)
        {
            var patient = _dbContext
                .Patient
                .FirstOrDefault(p => p.Id == id);
            if (patient == null)  return false;
            _dbContext .Patient .Remove(patient);
            _dbContext.SaveChanges();
            return true;
        }

        public PatientDto GetById(int id)
        {
            var patient = _dbContext
               .Patient
               .FirstOrDefault(p => p.Id == id);
            if (patient == null) return null;
            var result = _mapper.Map<PatientDto>(patient);

            return result;

        }


        public IEnumerable<PatientDto> GetAll()
        {
            var patient = _dbContext
                .Patient
                .ToList();

            var PatientDtos = _mapper.Map<List<PatientDto>>(patient);

            return PatientDtos;
        }

        public int Create(CreatePatientDto dto)
        {
            var patient = _mapper.Map<Patient>(dto);
            _dbContext.Patient.Add(patient);
            _dbContext.SaveChanges ();
            return patient.Id;
        }

        public bool Update(int id, UpdatePatientDto dto)
        {
            var patient = _dbContext.Patient.FirstOrDefault(p => p.Id == id);
            if (patient == null)
            {
                throw new Exception("Nieprawidłowe id pacjenta");
            }


            if (!string.IsNullOrEmpty(dto.FirstName))
            {
                patient.FirstName = dto.FirstName;
            }

            if (!string.IsNullOrEmpty(dto.LastName))
            {
                patient.LastName = dto.LastName;
            }

            if (!string.IsNullOrEmpty(dto.Pesel))
            {
                patient.Pesel = dto.Pesel;
            }

            if (dto.BirthDate.HasValue)
            {
                patient.BirthDate = dto.BirthDate.Value;
            }

            if (!string.IsNullOrEmpty(dto.Gender))
            {
                patient.Gender = dto.Gender;
            }
            // dane kontaktowe
            if (!string.IsNullOrEmpty(dto.PhoneNumber))
            {
                patient.PhoneNumber = dto.PhoneNumber;
            }

            if (!string.IsNullOrEmpty(dto.Email))
            {
                patient.Email = dto.Email;
            }
            // adres zamieszkania

            if (!string.IsNullOrEmpty(dto.City))
            {
                patient.City = dto.City;
            }

            if (!string.IsNullOrEmpty(dto.Street))
            {
                patient.Street = dto.Street;
            }

            if (!string.IsNullOrEmpty(dto.ApartmentNumber))
            {
                patient.ApartmentNumber = dto.ApartmentNumber;
            }

            if (!string.IsNullOrEmpty(dto.PostalCode))
            {
                patient.PostalCode = dto.PostalCode;
            }
            // pytania o zdrowie tak/nie

            if (dto.Pregnant.HasValue)
            {
                patient.Pregnant = dto.Pregnant.Value;
            }

            if (!string.IsNullOrEmpty(dto.PregnantRemarks))
            {
                patient.PregnantRemarks = dto.PregnantRemarks;
            }

            if (dto.Smoking.HasValue)
            {
                patient.Smoking = dto.Smoking.Value;
            }

            if (!string.IsNullOrEmpty(dto.SmokingRemarks))
            {
                patient.SmokingRemarks = dto.SmokingRemarks;
            }

            if (dto.Alcohol.HasValue)
            {
                patient.Alcohol = dto.Alcohol.Value;
            }

            if (!string.IsNullOrEmpty(dto.AlcoholRemarks))
            {
                patient.AlcoholRemarks = dto.AlcoholRemarks;
            }

            if (dto.SpecialDiet.HasValue)
            {
                patient.SpecialDiet = dto.SpecialDiet.Value;
            }

            if (!string.IsNullOrEmpty(dto.SpecialDietRemarks))
            {
                patient.SpecialDietRemarks = dto.SpecialDietRemarks;
            }

            if (dto.Allergies.HasValue)
            {
                patient.Allergies = dto.Allergies.Value;
            }

            if (!string.IsNullOrEmpty(dto.AllergiesRemarks))
            {
                patient.AllergiesRemarks = dto.AllergiesRemarks;
            }
            //pytania

            if (!string.IsNullOrEmpty(dto.Medications))
            {
                patient.Medications = dto.Medications;
            }

            if (!string.IsNullOrEmpty(dto.Surgeries))
            {
                patient.Surgeries = dto.Surgeries;
            }

            if (dto.Hospitalizations.HasValue)
            {
                patient.Hospitalizations = dto.Hospitalizations.Value;
            }
            // historia rodziny

            if (dto.Asthma.HasValue)
            {
                patient.Asthma = dto.Asthma.Value;
            }

            if (dto.HeartDisease.HasValue)
            {
                patient.HeartDisease = dto.HeartDisease.Value;
            }

            if (dto.prostateCancer.HasValue)
            {
                patient.prostateCancer = dto.prostateCancer.Value;
            }

            if (dto.Hypertension.HasValue)
            {
                patient.Hypertension = dto.Hypertension.Value;
            }

            if (dto.Diabetes.HasValue)
            {
                patient.Diabetes = dto.Diabetes.Value;
            }

            if (dto.BreastCancer.HasValue)
            {
                patient.BreastCancer = dto.BreastCancer.Value;
            }

            if (dto.OvarianCancer.HasValue)
            {
                patient.OvarianCancer = dto.OvarianCancer.Value;
            }

            if (dto.MetalIllness.HasValue)
            {
                patient.MetalIllness = dto.MetalIllness.Value;
            }

            if (dto.Other.HasValue)
            {
                patient.Other = dto.Other.Value;
            }

            if (!string.IsNullOrEmpty(dto.OtherRemarks))
            {
                patient.OtherRemarks = dto.OtherRemarks;
            }

            _dbContext.SaveChanges();
            return true;
        }

        public int GetPatientIdByLastName(string lastName)
        {
            var patient = _dbContext.Patient.FirstOrDefault(p => p.LastName == lastName);
            return patient != null ? patient.Id : -1;
        }
    }
}
