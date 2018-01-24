using Application.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace Application.User.Authentication.Controllers
{
    public class DataController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("api/data/forall")]
        public IHttpActionResult Get()
        {            
            return Ok("Now server time is " + DateTime.Now.ToString());
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/data/users")]
        public IHttpActionResult GetUsers()
        {
            var unitOfWork = new UnitOfWork(new PlutoContext());
            return Ok(unitOfWork.AppUsers.GetAll().Where(p => p.IsTerminated == false));
        }

        [Authorize]
        [HttpGet]
        [Route("api/data/authenticate")]
        public IHttpActionResult GetAuthenticate()
        {
            var identity = (ClaimsIdentity)User.Identity;
            return Ok("Now server time is " + identity.Name);
        }


        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/data/authorize")]
        public IHttpActionResult GetAdmin()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var roles = identity.Claims
                        .Where(c => c.Type == ClaimTypes.Role)
                        .Select(c => c.Value);
            return Ok("Now server time is " + identity.Name + " Role " + string.Join(",",roles.ToList()));
        }
    }
}
