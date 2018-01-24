using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository
{
   public  interface IUserRepository: IRepository<AppUser>
    {
        IEnumerable<AppUser> GetTopUser(int count);
    }
}
