using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // map from .. to ..
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>();
        }
    }
}
