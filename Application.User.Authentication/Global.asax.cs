using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using Application.Repository;
using System.Data.Entity;
using Application.Repository.Interface;
using System.Text;

namespace Application.User.Authentication
{
    public class Global : HttpApplication
    {
        private ILog _ILog;
        
        public Global()
        {
            _ILog = Log.GetInstance;
        }
        void Application_Start(object sender, EventArgs e)
        {
            HttpConfiguration config = GlobalConfiguration.Configuration;
            config.Formatters.JsonFormatter
                    .SerializerSettings
                    .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            Database.SetInitializer(new PlutoDbContextSeed());
        }

        void Application_Error(object sender, EventArgs e)
        {
            Exception ex = Server.GetLastError();
            Server.ClearError();
            _ILog.LogException(ex);

        }
    }
}