using Application.Repository;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Application.User.Authentication.Controllers
{
    public class AppUserController : ApiController
    {
        private UnitOfWork unitOfWork;

        public AppUserController()
        {
            unitOfWork = new UnitOfWork(new PlutoContext());
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddUser(AppUser newuser)
        {
            unitOfWork.AppUsers.Add(newuser);
            unitOfWork.Complete();
            return Ok("One User Added Successfully");
        }
    }
}
