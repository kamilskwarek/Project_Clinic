using FluentValidation;
using Przychodnia.Entities;
using Przychodnia.Models.Employee;

namespace Przychodnia.Models.Validators
{
    public class CreateEmployeeDtoValidator : AbstractValidator<CreateEmployeeDto>
    {

        public CreateEmployeeDtoValidator(ClinicDbContext dbContext) { 
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.PasswordHash).MinimumLength(6);

            RuleFor(x => x.ConfirmPassword).Equal(e => e.PasswordHash);

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var emailInUse = dbContext.Employee.Any(e => e.Email == value);
                    if(emailInUse)
                    {
                        context.AddFailure("email", "That email is taken");
                    }

                });
        }
    }
}
