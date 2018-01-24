using Application.Repository;
using BusinessEntity;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Application.User.Authentication
{
    public class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private UnitOfWork unitOfWork;
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            unitOfWork = new UnitOfWork(new PlutoContext());
             AppUser loginUser =  unitOfWork.AppUsers.Find(c => c.username == context.UserName && c.password == context.Password).FirstOrDefault();
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            if(loginUser != null)
            {
                if (loginUser.alterEgo.ToUpper() == "ADMIN")
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
                    identity.AddClaim(new Claim("username", loginUser.username));
                    identity.AddClaim(new Claim(ClaimTypes.Name, loginUser.username));
                    context.Validated(identity);
                }
                else if (loginUser.alterEgo.ToUpper() == "STAFF")
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, "staff"));
                    identity.AddClaim(new Claim("username", loginUser.username));
                    identity.AddClaim(new Claim(ClaimTypes.Name, loginUser.username));
                    context.Validated(identity);
                }
                else
                {
                    context.SetError("invalid grant", "Provided username and password is incorrect");
                    return;
                }
            }
            else
            {
                context.SetError("invalid grant", "Provided username and password is incorrect");
                return;
            }
        }
    }
}