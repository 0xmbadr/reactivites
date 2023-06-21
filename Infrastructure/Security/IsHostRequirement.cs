using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement { }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _DBContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(
            DataContext DBContext,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _httpContextAccessor = httpContextAccessor;
            _DBContext = DBContext;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            IsHostRequirement requirement
        )
        {
            // Get User ID
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Return User Not Authorized, Don't meet Auth Requirements
            if (userId == null)
                return Task.CompletedTask;
            // turn Guid String to Guid Object
            var activityId = Guid.Parse(
                _httpContextAccessor.HttpContext?.Request.RouteValues
                    .SingleOrDefault(x => x.Key == "id")
                    .Value?.ToString()!
            );

            // Get Attendee Object
            // Result is used bc we are overriding Task and we want to return CompletedTask
            var attendee = _DBContext.ActivityAttendees
                .AsNoTracking()
                // .FindAsync(userId, activityId)   => doesn't work with AsNoTracking
                .SingleOrDefaultAsync(x => x.ActivityId == activityId && x.AppUserId == userId)
                .Result;

            if (attendee == null)
                return Task.CompletedTask;

            if (attendee.IsHost)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
