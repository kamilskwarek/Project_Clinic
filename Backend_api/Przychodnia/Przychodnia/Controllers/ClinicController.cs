using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "Admin")]

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
        [Authorize(Roles = "Admin")]

        public ActionResult CreateClinic([FromBody]CreateClinicDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = _clinicService.Create(dto);

            return Created($"/api/clinic/{id}", new { id = id });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

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
        [Authorize(Roles = "Admin,Lekarz,Recepcjonista")]

        public ActionResult<IEnumerable<ClinicDto>> GetAll()
        {
            var clinicsDtos = _clinicService.GetAll();

            return Ok(clinicsDtos);
        }


        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Lekarz,Recepcjonista")]

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
