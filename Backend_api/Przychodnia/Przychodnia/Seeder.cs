using Przychodnia.Entities;
using System;
using System.Linq;

namespace Przychodnia
{
    public class Seeder
    {
        private readonly ClinicDbContext _dbcontext;

        public Seeder(ClinicDbContext dbContext)
        {
            _dbcontext = dbContext;
        }

        public void Seed()
        {
            if(_dbcontext.Database.CanConnect())
            {
                if (!_dbcontext.Clinic.Any())
                {
                    var clinics = GetClinic();
                    _dbcontext.Clinic.AddRange(clinics);
                    _dbcontext.SaveChanges();
                }
                if (!_dbcontext.jobPositions.Any())
                {
                    var jobPositions = GetJobPositions();
                    _dbcontext.jobPositions.AddRange(jobPositions);
                    _dbcontext.SaveChanges();
                    if (!_dbcontext.Employee.Any())
                    {
                        var employees = GetEmployees();
                        _dbcontext.Employee.AddRange(employees);
                        _dbcontext.SaveChanges();
                    }
                }

                if (!_dbcontext.Patient.Any())
                {
                    var patients = GetPatients();
                    _dbcontext.Patient.AddRange(patients);
                    _dbcontext.SaveChanges();
                }

                if (!_dbcontext.Visits.Any()) 
                {
                    var visits = GetVisits();
                    _dbcontext.Visits.AddRange(visits);
                    _dbcontext.SaveChanges();
                }
            }
        }

        private IEnumerable<Patient> GetPatients()
        {
            var patients = new List<Patient>
        {
            new Patient
            {
                FirstName = "Jan",
                LastName = "Rudzki",
                Pesel = "1234567890",
                BirthDate = new DateTime(1980, 5, 10),
                Gender = "Male",
                PhoneNumber = "123-456-789",
                Email = "jan.kowalski@example.com",
                City = "Warszawa",
                Street = "Aleje Jerozolimskie",
                ApartmentNumber = "10",
                PostalCode = "00-001",
                Pregnant = false,
                PregnantRemarks = "",
                Smoking = true,
                SmokingRemarks = "10 cigarettes per day",
                Alcohol = false,
                AlcoholRemarks = "",
                SpecialDiet = true,
                SpecialDietRemarks = "Vegetarian",
                Allergies = true,
                AllergiesRemarks = "Pollen allergy",
                Medications = "Paracetamol",
                Surgeries = "Appendectomy",
                Hospitalizations = false,
                Asthma = false,
                HeartDisease = false,
                prostateCancer = false,
                Hypertension = false,
                Diabetes = false,
                BreastCancer = false,
                OvarianCancer = false,
                MetalIllness = false,
                Other = false,
                OtherRemarks = ""
            },
            new Patient
            {
                FirstName = "Anna",
                LastName = "Zając",
                Pesel = "0987654321",
                BirthDate = new DateTime(1992, 9, 15),
                Gender = "Female",
                PhoneNumber = "987-654-321",
                Email = "anna.nowak@example.com",
                City = "Kraków",
                Street = "Rynek Główny",
                ApartmentNumber = "20",
                PostalCode = "30-001",
                Pregnant = true,
                PregnantRemarks = "Second trimester",
                Smoking = false,
                SmokingRemarks = "",
                Alcohol = true,
                AlcoholRemarks = "Occasional drinking",
                SpecialDiet = false,
                SpecialDietRemarks = "",
                Allergies = false,
                AllergiesRemarks = "",
                Medications = "None",
                Surgeries = "None",
                Hospitalizations = false,
                Asthma = false,
                HeartDisease = false,
                prostateCancer = false,
                Hypertension = false,
                Diabetes = false,
                BreastCancer = false,
                OvarianCancer = false,
                MetalIllness = false,
                Other = false,
                OtherRemarks = ""
            },
            new Patient
            {
                FirstName = "Piotr",
                LastName = "Lewandowski",
                Pesel = "5678901234",
                BirthDate = new DateTime(1975, 3, 22),
                Gender = "Male",
                PhoneNumber = "555-555-555",
                Email = "piotr.kowalczyk@example.com",
                City = "Gdańsk",
                Street = "Długi Targ",
                ApartmentNumber = "30",
                PostalCode = "80-831",
                Pregnant = false,
                PregnantRemarks = "",
                Smoking = false,
                SmokingRemarks = "",
                Alcohol = true,
                AlcoholRemarks = "Social drinking",
                SpecialDiet = false,
                SpecialDietRemarks = "",
                Allergies = true,
                AllergiesRemarks = "Peanut allergy",
                Medications = "None",
                Surgeries = "None",
                Hospitalizations = false,
                Asthma = false,
                HeartDisease = false,
                prostateCancer = false,
                Hypertension = false,
                Diabetes = false,
                BreastCancer = false,
                OvarianCancer = false,
                MetalIllness = false,
                Other = true,
                OtherRemarks = "Migraines"
            }
        };

            return patients;
        }

        private IEnumerable<JobPosition> GetJobPositions()
        {
            var jobPositions = new List<JobPosition>
            {
                new JobPosition
                {
                    JobTitle = "Lekarz",
                    JobDescription = "Opis stanowiska lekarza"
                },
                new JobPosition
                {
                    JobTitle = "Pielęgniarka",
                    JobDescription = "Opis stanowiska pielęgniarki"
                },
                new JobPosition
                {
                    JobTitle = "Recepcjonista",
                    JobDescription = "Opis stanowiska recepcjonisty"
                }
            };

            return jobPositions;

        }

        private IEnumerable<Visit> GetVisits()
        {
            var visits = new List<Visit>();

            // Dzisiejsza data
            DateTime startDate = DateTime.Today;
            // Liczba dni do przodu
            int daysToAdd = 3;

            for (int i = 0; i < 5; i++)
            {
                var visit = new Visit
                {
                    VisitDate = startDate.AddDays(i % daysToAdd),
                    StartTime = new TimeSpan(10 + i, 0, 0), // Przykładowy czas rozpoczęcia, zmieniony dla różnorodności
                    EndTime = new TimeSpan(11 + i, 0, 0), // Przykładowy czas zakończenia, zmieniony dla różnorodności
                    Notes = $"Visit {i + 1} notes",
                    EmployeeId = (i % 3) + 1, // Przykładowy ID pracownika, zmieniony dla różnorodności
                    PatientId = (i % 3) + 1 // Przykładowy ID pacjenta, zmieniony dla różnorodności
                };
                visits.Add(visit);
            }

            return visits;
        }



        private IEnumerable<Employee> GetEmployees()
        {
            var employees = new List<Employee>
            {
                new Employee
                {
                    FirstName = "Jan",
                    LastName = "Kowalski",
                    Pesel = "1234567890",
                    PhoneNumber = "123-456-789",
                    JobPositionId = 1,
                    ClinicId = 1
                },
                new Employee
                {
                    FirstName = "Anna",
                    LastName = "Nowak",
                    Pesel = "0987654321",
                    PhoneNumber = "987-654-321",
                    JobPositionId = 2,
                    ClinicId = 2
                },
                new Employee
                {
                    FirstName = "Piotr",
                    LastName = "Kowalczyk",
                    Pesel = "5678901234",
                    PhoneNumber = "555-555-555",
                    JobPositionId = 2,
                    ClinicId = 3
                },
                new Employee
                {
                    FirstName = "Jan",
                    LastName = "Kowalski",
                    Pesel = "1234567890",
                    PhoneNumber = "123-456-789",
                    JobPositionId = 1,
                    ClinicId = 1
                },
                new Employee
                {
                    FirstName = "Anna",
                    LastName = "Nowak",
                    Pesel = "0987654321",
                    PhoneNumber = "987-654-321",
                    JobPositionId = 2,
                    ClinicId = 2
                },
                new Employee
                {
                    FirstName = "Piotr",
                    LastName = "Kowalczyk",
                    Pesel = "5678901234",
                    PhoneNumber = "555-555-555",
                    JobPositionId = 2,
                    ClinicId = 3
                },
                new Employee
                {
                    FirstName = "Jan",
                    LastName = "Kowalski",
                    Pesel = "1234567890",
                    PhoneNumber = "123-456-789",
                    JobPositionId = 1,
                    ClinicId = 1
                },
                new Employee
                {
                    FirstName = "Anna",
                    LastName = "Nowak",
                    Pesel = "0987654321",
                    PhoneNumber = "987-654-321",
                    JobPositionId = 2,
                    ClinicId = 2
                },
                new Employee
                {
                    FirstName = "Piotr",
                    LastName = "Kowalczyk",
                    Pesel = "5678901234",
                    PhoneNumber = "555-555-555",
                    JobPositionId = 2,
                    ClinicId = 3
                },

            };

            return employees;
        }
        private IEnumerable<Clinic> GetClinic()
        {
            var clinics = new List<Clinic>
            {
                new Clinic
                {
                    Name = "Przychodnia A",
                    Description = "Opis przychodni A",
                    ContactEmail = "przychodniaA@example.com",
                    ContactNumber = "123-456-789",
                    City = "Warszawa",
                    Street = "Aleje Jerozolimskie",
                    BuildingNumber = "100",
                    PostalCode = "00-001"
                },
                new Clinic
                {
                    Name = "Przychodnia B",
                    Description = "Opis przychodni B",
                    ContactEmail = "przychodniaB@example.com",
                    ContactNumber = "987-654-321",
                    City = "Kraków",
                    Street = "Rynek Główny",
                    BuildingNumber = "50",
                    PostalCode = "30-001"
                },
                new Clinic
                {
                    Name = "Przychodnia C",
                    Description = "Opis przychodni C",
                    ContactEmail = "przychodniaC@example.com",
                    ContactNumber = "555-555-555",
                    City = "Gdańsk",
                    Street = "Długi Targ",
                    BuildingNumber = "10",
                    PostalCode = "80-831"
                }
            };

            return clinics;
        }




    }
}
