using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseApiController : ControllerBase
    {
        // Make _mediator avaiable for any child class
        private IMediator _mediator;
        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if (result is null)
            {
                return NotFound();
            }
            else if (result.IsSuccess && result.Value is not null)
            {
                return Ok(result.Value);
            }
            else if (result.IsSuccess && result.Value is null)
            {
                return NotFound();
            }
            else
            {
                return BadRequest(result.Error);
            }
        }
    }
}
