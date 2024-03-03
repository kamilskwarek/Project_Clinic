using Microsoft.EntityFrameworkCore;

namespace Przychodnia.Entities
{
    public class ClinicDbContext : DbContext
    {
        private string _connectionString = "Server=(localdb)\\mssqllocaldb;Database=PrzychodniaDb;Trusted_Connection=True;";
        public DbSet<Clinic> Clinic { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<JobPosition> jobPositions { get; set; }
        public DbSet<MedicalPrescription> MedicalPrescription { get; set; }
        public DbSet<MedicalPrescriptionMedicines> medicalPrescriptionMedicines { get; set; }
        public DbSet<Medicines> Medicines   { get;set; }
        public DbSet<Patient> Patient { get; set; }
        public DbSet<SickLeave> SickLeave { get; set; }
        public DbSet<TreatmentHistory> TreatmentHistory { get; set; }
        public DbSet<Vaccinations> Vaccinations { get; set; }
        public DbSet<Visit> Visits { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //clinic
            modelBuilder.Entity<Clinic>()
                .Property(c => c.Name)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Clinic>()
                .Property(c => c.Description)
                .HasMaxLength(500);
            modelBuilder.Entity<Clinic>()
                .Property(c => c.ContactEmail)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Clinic>()
                .Property(c => c.ContactNumber)
                .HasMaxLength(14)
                .IsRequired();
            modelBuilder.Entity<Clinic>()
                .Property(c => c.City)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Clinic>()
                .Property(c => c.Street)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Clinic>()
                .Property(c => c.BuildingNumber)
                .HasMaxLength(10)
                .IsRequired();
            modelBuilder.Entity<Clinic>()
                .Property(c => c.PostalCode)
                .HasMaxLength(10)
                .IsRequired();

            //Employee
            modelBuilder.Entity<Employee>()
                .Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Employee>()
                .Property(e => e.LastName)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Employee>()
                .Property(e => e.Pesel)
                .HasMaxLength(11)
                .IsRequired();
            modelBuilder.Entity<Employee>()
                .Property(e => e.PhoneNumber)
                .HasMaxLength(14)
                .IsRequired();
            

            //JobPosition
            modelBuilder.Entity<JobPosition>()
               .Property(jp => jp.JobTitle)
               .HasMaxLength(50)
               .IsRequired();
            modelBuilder.Entity<JobPosition>()
               .Property(jp => jp.JobDescription)
               .HasMaxLength(100)
               .IsRequired(false);


            //MedicalPrescription
            modelBuilder.Entity<MedicalPrescription>()
               .Property(mp => mp.Recommendations)
               .HasMaxLength(100)
               .IsRequired();

            //Medicines
            modelBuilder.Entity<Medicines>()
               .Property(m => m.MedicineName)
               .HasMaxLength(50)
               .IsRequired();
            modelBuilder.Entity<Medicines>()
               .Property(m => m.Dosage)
               .HasMaxLength(25)
               .IsRequired();
            modelBuilder.Entity<Medicines>()
               .Property(m => m.Duration)
               .HasMaxLength(25)
               .IsRequired();

            //Patient
            //dane osobowe
            modelBuilder.Entity<Patient>()
              .Property(p => p.FirstName)
              .HasMaxLength(50)
              .IsRequired();
            modelBuilder.Entity<Patient>()
              .Property(p => p.LastName)
              .HasMaxLength(50)
              .IsRequired();
            modelBuilder.Entity<Patient>()
              .Property(p => p.Pesel)
              .HasMaxLength(11)
              .IsRequired();
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.Property(e => e.BirthDate)
                    .HasColumnType("date")
                    .IsRequired();
            });
            modelBuilder.Entity<Patient>()
              .Property(p => p.Gender)
              .HasMaxLength(25)
              .IsRequired();


            // dane kontaktowe
            modelBuilder.Entity<Patient>()
              .Property(p => p.PhoneNumber)
              .HasMaxLength(14)
              .IsRequired();
            modelBuilder.Entity<Patient>()
              .Property(p => p.Email)
              .HasMaxLength(50);

            // adress zamieszkania
            modelBuilder.Entity<Patient>()
              .Property(p => p.City)
              .HasMaxLength(50)
              .IsRequired();
            modelBuilder.Entity<Patient>()
              .Property(p => p.Street)
              .HasMaxLength(50)
              .IsRequired();
            modelBuilder.Entity<Patient>()
              .Property(p => p.ApartmentNumber)
              .HasMaxLength(10)
              .IsRequired();
            modelBuilder.Entity<Patient>()
              .Property(p => p.PostalCode)
              .HasMaxLength(10)
              .IsRequired();

            // pytania o zdrowie tak/nie
            modelBuilder.Entity<Patient>()
                 .Property(p => p.Pregnant)
                 .IsRequired();
            modelBuilder.Entity<Patient>()
                 .Property(p => p.PregnantRemakrs)
                  .HasMaxLength(100)
                .IsRequired(false);


            modelBuilder.Entity<Patient>()
                 .Property(p => p.Smoking)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                 .Property(p => p.SmokingRemakrs)
                  .HasMaxLength(100)
                .IsRequired(false);


            modelBuilder.Entity<Patient>()
                .Property(p => p.Alcohol)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.AlcoholRemakrs)
                .HasMaxLength(100)
                .IsRequired(false);


            modelBuilder.Entity<Patient>()
                .Property(p => p.SpecialDiet)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.SpecialDietRemakrs)
                 .HasMaxLength(100)
                .IsRequired(false);


            modelBuilder.Entity<Patient>()
                 .Property(p => p.Allergies)
                 .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.AllergiesRemakrs)
                   .HasMaxLength(100)
                .IsRequired(false);


            //pytania
            modelBuilder.Entity<Patient>()
              .Property(p => p.Medications)
              .HasMaxLength(250)
              .IsRequired(false);
            modelBuilder.Entity<Patient>()
              .Property(p => p.Surgerys)
              .HasMaxLength(250)
              .IsRequired(false);
            modelBuilder.Entity<Patient>()
              .Property(p => p.Hospitalizations)
              .HasMaxLength(250)
              .IsRequired(false);

            // historia rodziny
            modelBuilder.Entity<Patient>()
                .Property(p => p.Asthma)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.HeartDisease)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.ProstateCaner)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.Hypertension)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.Diabetes)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.BreastCancer)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.OvarianCancer)
                .IsRequired();
            modelBuilder.Entity<Patient>()
                .Property(p => p.MetalIllness)
                .IsRequired();

            modelBuilder.Entity<Patient>()
                .Property(p => p.Other)
                .IsRequired();
            modelBuilder.Entity<Patient>()
             .Property(p => p.OtherRemarks)
             .HasMaxLength(250)
             .IsRequired(false);

            //SickLeave
            modelBuilder.Entity<SickLeave>()
                .Property(p => p.StartDate)
                .IsRequired();
            modelBuilder.Entity<SickLeave>()
                .Property(p => p.EndDate)
                .IsRequired();

            //Vaccinations
            modelBuilder.Entity<Vaccinations>()
                .Property(p => p.VaccinName)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Vaccinations>()
               .Property(p => p.VaccinationDate)
               .IsRequired();

            //Visits
            modelBuilder.Entity<Visit>()
                .Property(p => p.VisitDate)
                .IsRequired();
            modelBuilder.Entity<Visit>()
                .Property(p => p.StartTime) 
                .IsRequired();
            modelBuilder.Entity<Visit>()
                .Property(p => p.EndTime)
                .IsRequired();
            modelBuilder.Entity<Visit>()
                .Property(p => p.Notes)
                .HasMaxLength(500);



            //relacje MedicalPrescriptionMedicines
            modelBuilder.Entity<MedicalPrescriptionMedicines>()
                .HasKey(mpm => new { mpm.MedicalPrescriptionId, mpm.MedicinesId });

            modelBuilder.Entity<MedicalPrescriptionMedicines>()
                .HasOne(mpm => mpm.MedicalPrescription)
                .WithMany(mp => mp.MedicalPrescriptionMedicines)
                .HasForeignKey(mpm => mpm.MedicalPrescriptionId);

            modelBuilder.Entity<MedicalPrescriptionMedicines>()
                .HasOne(mpm => mpm.Medicines)
                .WithMany(m => m.MedicalPrescriptionMedicines)
                .HasForeignKey(mpm => mpm.MedicinesId);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
