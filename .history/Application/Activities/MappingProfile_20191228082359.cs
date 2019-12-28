using AutoMapper;
using Domain;

namespace Application.Activities
{
    //Profile for  autoMapper
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>();
        }
    }
}