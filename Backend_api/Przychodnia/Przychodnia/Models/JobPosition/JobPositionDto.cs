using Przychodnia.Entities;
using System.ComponentModel.DataAnnotations;


namespace Przychodnia.Models.JobPosition
{
    public class JobPositionDto
    {
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
    }
}
