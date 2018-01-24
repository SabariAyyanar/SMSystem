using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class HostelRepository : Repository<Hostel>,IHostelRepository
    {
        private ILog _ILog;
        public HostelRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public IEnumerable<Hostel> GetAllHostel()
        {
            try
            {
                return PlutoContext.hostels.Include("rooms").ToList();
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                return new List<Hostel>();
            }
        }
    }
}