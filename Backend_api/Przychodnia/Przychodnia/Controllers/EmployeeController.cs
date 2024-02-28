using Microsoft.AspNetCore.Mvc;
using Przychodnia.Models.Employee;
using Przychodnia.Services;

namespace Przychodnia.Controllers
{

    [Route("api/Employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
     
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpDelete("{id}")]
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
        public ActionResult Create([FromBody]CreateEmployeeDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = _employeeService.Create(dto);

            return Created($"/api/employee/{id}", null);
        }

        [HttpPut("{id}")]
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

        [HttpGet]
        public ActionResult<IEnumerable<EmployeeDto>> GetAll()
        {
            var employeeDtos = _employeeService.GetAll();

            return Ok(employeeDtos);
        }


        [HttpGet("{id}")]
        public ActionResult<EmployeeDto> Get([FromRoute] int id)
        {
            var employee = _employeeService.GetByIdWithDetails(id);
            if (employee == null)
            {
                return NotFound();
            }


            return Ok(employee);
        }
    }
}
