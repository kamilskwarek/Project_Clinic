using Microsoft.AspNetCore.Mvc;
using Przychodnia.Models.JobPosition;
using Przychodnia.Services;

namespace Przychodnia.Controllers
{

    [Route("api/jobposition")]
    public class JobPositionController : ControllerBase
    {
        private readonly IJobPositionService _jobPositionService;

        public JobPositionController(IJobPositionService jobPostionService)
        {
            _jobPositionService = jobPostionService;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var isDeleted = _jobPositionService.Delete(id);
            if(isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }
        [HttpPost]
        public ActionResult CreateJobPosiotion([FromBody]CreateJobPosiotionDto dto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = _jobPositionService.Create(dto);
            return Created($"/api/jobpositon/{id}", null);
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody]UpdateJobPositionDto? dto, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var isUpdated = _jobPositionService.Update(id, dto);
            if(!isUpdated)
            {
                return NoContent();
            }
            return Ok();
        }


        [HttpGet]
        public ActionResult<IEnumerable<JobPositionDto>> GetAll()
        {
            var jobPositionDtos = _jobPositionService.GetAll();
            return Ok(jobPositionDtos);
        }

        [HttpGet("{id}")]
        public ActionResult<JobPositionDto> Get([FromRoute]int id)
        {
            var jobPosition = _jobPositionService.GetById(id);
            if(jobPosition == null)
            {
                return NotFound();
            }
            return Ok(jobPosition);
        }
    }

}
