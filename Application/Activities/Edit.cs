using Domain;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                // try
                // {

                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                activity.Title = request.Activity.Title ?? activity.Title;

                await _context.SaveChangesAsync();
                // }
                // catch (Exception ex)
                // {
                //     Console.WriteLine(ex);
                // }

                return Unit.Value;
            }
        }
    }
}