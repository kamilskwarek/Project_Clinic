using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Przychodnia.Entities;
using Przychodnia.Models.Clinic;
using Przychodnia.Services;

namespace Przychodnia.Controllers
{

    [Route("api/clinic")]
    public class ClinicController : ControllerBase
    {
        private readonly IClinicService _clinicService;


        public ClinicController(IClinicService clinicService)
        {
            _clinicService = clinicService;
        }
        
        
        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            var isDeleted = _clinicService.Delete(id);

            if (isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }


        [HttpPost]
        public ActionResult CreateClinic([FromBody]CreateClinicDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = _clinicService.Create(dto);

            return Created($"/api/clinic/{id}", null);
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody]UpdateClinicDto? dto, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUpdated = _clinicService.Update(id, dto);
            if (!isUpdated)
            {
                return NotFound();
            }
            return Ok();

        }

        [HttpGet]
        public ActionResult<IEnumerable<ClinicDto>> GetAll()
        {
            var clinicsDtos = _clinicService.GetAll();

            return Ok(clinicsDtos);
        }


        [HttpGet("{id}")]
        public ActionResult<ClinicDto> Get([FromRoute] int id)
        {
            var clinic = _clinicService.GetById(id);
            if(clinic == null)
            {
                return NotFound();
            }


            return Ok(clinic);
        }


    }
}
