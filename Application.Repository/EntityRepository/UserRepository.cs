using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Application.Repository
{
    public class UserRepository : Repository<AppUser>, IUserRepository
    {
       
       public UserRepository(PlutoContext context) : base(context)
             {
                     
              }

        public IEnumerable<AppUser> GetTopUser(int count)
        {
            return PlutoContext.appusers.OrderByDescending(c => c.Id).Take(count).ToList();
        }


        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }
    }
}