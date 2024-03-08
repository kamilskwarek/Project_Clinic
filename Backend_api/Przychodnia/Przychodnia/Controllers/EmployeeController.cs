using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Przychodnia.Models.Employee;
using Przychodnia.Services;
using System.Data;

namespace Przychodnia.Controllers
{

    [Route("api/Employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IUserContextService _userContextService;

        public EmployeeController(IEmployeeService employeeService, IUserContextService userContextService)
        {
            _employeeService = employeeService;
            _userContextService = userContextService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginDto dto)
        {
            string token = _employeeService.GenerateJwt(dto);
            return Ok(token);
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public IActionResult Delete([FromRoute] int id)
        {
            var isDeleted = _employeeService.Delete(id);
            if (isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]

        public ActionResult Create([FromBody]CreateEmployeeDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = _employeeService.Create(dto);

            return Created($"/api/employee/{id}", new { id = id });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public ActionResult Update([FromBody] UpdateEmployeeDto? dto, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUpdated = _employeeService.Update(id, dto);
            if (!isUpdated)
            {
                return NotFound();
            }
            return Ok();

        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Lekarz,Recepcjonista")]

        public ActionResult<EmployeeDto> Get([FromRoute] int id)
        {
            var employee = _employeeService.GetByIdWithDetails(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
        [HttpGet]
        [Authorize(Roles = "Admin,Lekarz,Recepcjonista")]

        public ActionResult<IEnumerable<EmployeeDto>> GetAll()
        {
            var employeeDtos = _employeeService.GetAll();

            return Ok(employeeDtos);
        }

        [HttpGet("me")]

        [AllowAnonymous]
        public ActionResult<EmployeeDto> GetCurrentUser()
        {
          
            var userId = _userContextService.GetUserId;

            if (!userId.HasValue)
            {
                return Unauthorized();
            }

         
            var user = _employeeService.GetById(userId.Value);

          
            if (user == null)
            {
                return NotFound();
            }

          
            return Ok(user);
        }

    }
}
