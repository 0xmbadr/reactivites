using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAcessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(
                DataContext context,
                IPhotoAccessor photoAcessor,
                IUserAccessor userAccessor
            )
            {
                _userAccessor = userAccessor;
                _photoAcessor = photoAcessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var user = await _context.Users
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if (photo == null)
                    return null;

                if (photo.IsMain)
                    return Result<Unit>.Failure("You cannot delete your main photo");

                var result = await _photoAcessor.DeletePhoto(photo.Id);

                if (result == null)
                    return Result<Unit>.Failure("Problem deleting photo");

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo");
            }
        }
    }
}
