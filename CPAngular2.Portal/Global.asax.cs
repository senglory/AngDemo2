using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using System.Reflection;
using System.Web.Http;
using System.Web.Routing;

using NLog;


namespace CodeProjectAngular2.Portal
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        static readonly Logger _logger = LogManager.GetCurrentClassLogger();


        protected void Application_Start()
        {
            var stopWatchTimer = new Stopwatch();
            stopWatchTimer.Start();
            var pad = new String('#', 80);
            _logger.Info(pad);
            _logger.Info("Application Start");
            _logger.Info(Assembly.GetExecutingAssembly().FullName);
            _logger.Info(pad);


            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
