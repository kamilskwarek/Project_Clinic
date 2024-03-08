
using Microsoft.AspNetCore.Mvc;
using Przychodnia.Services;
using Przychodnia.Models.Patient;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace Przychodnia.Controllers
{
    [Route("api/patient")]
    [Authorize(Roles = "Admin,Lekarz,Recepcjonista")]


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
            return Created($"/api/patient/{id}", new { id = id });

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
        [Authorize(Roles = "Admin,Lekarz,Recepcjonista")]

        public ActionResult<IEnumerable<PatientDto>> GetAll()
        {
            var patientDtos = _patientService.GetAll();
            return Ok(patientDtos);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Lekarz,Recepcjonista")]

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
