using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BarcelonaBGSchool.Models;

namespace BarcelonaBGSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly BarcelonaBGSchoolContext _context;

        public GroupsController(BarcelonaBGSchoolContext context)
        {
            _context = context;           
        }

        [HttpGet]
        public JsonResult GetAllGroups()
        {            
            var groups = from g in _context.Groups
                         select new
                         {
                             id = g.Id,
                             group_name = g.Name,
                             year_started = g.YearStarted                            
                         };
            var rows = groups.ToArray();

            return new JsonResult(rows);
        }

        [Route("edit/{id}")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroup([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var group = await _context.Groups.FindAsync(id);

            if (group == null)
            {
                return NotFound();
            }

            var groupDTO = new
            {
                id = group.Id,
                group_name = group.Name,
                year_started = group.YearStarted.ToString("yyyy-MM-dd")
            };

            return Ok(groupDTO);
        }
        
        [Route("update/{id}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroup([FromRoute] Guid id, [FromForm] Group group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != group.Id)
            {
                return BadRequest();
            }

            _context.Entry(group).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> PostGroup([FromForm] Group group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            group.Id = Guid.NewGuid();
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroupClass", new { id = group.Id }, group);
        }

        [Route("delete/{id}")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var group = await _context.Groups.FindAsync(id);
            if (group == null)
            {
                return NotFound();
            }

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return Ok(group);
        }

        private bool GroupExists(Guid id)
        {
            return _context.Groups.Any(e => e.Id == id);
        }
    }
}