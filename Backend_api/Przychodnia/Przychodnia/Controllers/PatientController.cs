
using Microsoft.AspNetCore.Mvc;
using Przychodnia.Services;
using Przychodnia.Models.Patient;

namespace Przychodnia.Controllers
{
    [Route("api/Patient")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            var isDeleted = _patientService.Delete(id);

            if (isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult CreatePatient([FromBody] CreatePatientDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = _patientService.Create(dto);
            return Created($"/api/patient/{id}", null);

        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody] UpdatePatientDto? dto, [FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUpdated = _patientService.Update(id, dto);
            if(!isUpdated)
            {
                return NotFound();

            }
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<PatientDto>> GetAll()
        {
            var patientDtos = _patientService.GetAll();
            return Ok(patientDtos);
        }

        [HttpGet("{id}")]
        public ActionResult<PatientDto> Get([FromRoute] int id)
        {
            var patient = _patientService.GetById(id);
            if(patient == null)
            {
                return NotFound();

            }
            return Ok(patient);
        }

    }
}
