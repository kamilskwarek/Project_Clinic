using Microsoft.AspNetCore.Mvc;
using Przychodnia.Models.Visit;
using Przychodnia.Services;


namespace Przychodnia.Controllers
{
    [Route("api/Visit")]
    public class VisitController : ControllerBase
    {
        private readonly IVisitService _visitService;

        public VisitController(IVisitService visitService)
        {
            _visitService = visitService;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var isDeleted = _visitService.Delete(id);
            if (!isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult Create([FromBody]CreateVisitDto dto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            var id = _visitService.Create(dto);

            return Created($"/api/visit/{id}", null);
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody] UpdateVisitDto? dto, [FromRoute] int id)
        { 
        if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            var isUpdated = _visitService.Update(id, dto);
            if(!isUpdated)
            {
                return NotFound();
            }

            return Ok();

        }
        [HttpGet]
        public ActionResult<IEnumerable<VisitDto>> GetAll()
        { 
         var visitDtos = _visitService.GetAll();
            return Ok(visitDtos);
        }

        [HttpGet("{id}")]
        public ActionResult<VisitDto> Get([FromRoute] int id)
        {
            var visit = _visitService.GetByIdWithDetails(id);
            if(visit == null)
            {
                return NotFound();
            }
            return Ok(visit);
        }






    }
}
