using Application.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Web;

namespace Application.Repository
{
    public sealed class Log : ILog
    {

        private Log()
        {

        }

        private static readonly Lazy<Log> instance = new Lazy<Log>(() => new Log());

        public static Log GetInstance
        {
            get
            {
                return instance.Value;
            }
        }
        public void LogException(Exception ex)
        {
            //Logfolder stores the directory name of the exception to be stored
            string logfolder = string.Format(@"{0}\{1}\{2}\{3}", "EXCEPTION_FROM_ASP", DateTime.Now.Year,DateTime.Now.ToString("MMMM"),DateTime.Now.Day);
            //logFilePath stores the file name of the exception to be stored
            string logFilePath = string.Format(@"{0}\{1}", AppDomain.CurrentDomain.BaseDirectory, logfolder);
            var st = new StackTrace(ex, true);
            var frame = st.GetFrame(0);

            //getting exception line number
            var line = LineNumber(ex);

            //getting exception full method name
            var functionname = frame.GetMethod();
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("---------------------------------------------------------------------------------------");
            sb.AppendLine("ERROR MESSAGE: " + ex.Message);
            sb.AppendLine("----------------------------------------------------------------------------------------");
            sb.AppendLine("OCCURRED AT LINE: " + line);
            sb.AppendLine("----------------------------------------------------------------------------------------");
            sb.AppendLine("FUNCTION NAME: " + functionname.DeclaringType.FullName + "." + functionname.Name);
            sb.AppendLine("----------------------------------------------------------------------------------------");
            sb.AppendLine();
            sb.AppendLine();
            sb.AppendLine();
            sb.AppendLine(ex.ToString());
            if (!File.Exists(logFilePath))
            {
                string name = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                DirectorySecurity directory = new DirectorySecurity();
                directory.AddAccessRule(new FileSystemAccessRule(name, FileSystemRights.FullControl, AccessControlType.Allow));
                Directory.CreateDirectory(logFilePath,directory);
            }

            //Try block to check if other exceptions occurs while writing text to file
            try
            {
                using (StreamWriter writer = new StreamWriter(logFilePath + "\\" + DateTime.Now.ToString("HH_mm_ss") + ".txt", true))
                {
                    writer.Write(sb.ToString());
                    writer.Flush();
                }
            }
            catch (Exception)
            {
                //Ignorre all other exceptions
            }
        }

        public static int LineNumber(Exception ex) {
            var lineNumber = 0;
            const string lineSearch = ":line ";
            var index = ex.StackTrace.LastIndexOf(lineSearch);
            if(index != -1){
                var lineNumberText = ex.StackTrace.Substring(index + lineSearch.Length);
                if(int.TryParse(lineNumberText, out lineNumber))
                {

                }
            }
            return lineNumber;
        }
    }
}