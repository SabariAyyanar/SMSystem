using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class RoomRepository : Repository<Room>, IRoomRepository
    {
        private ILog _ILog;
        public RoomRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public IEnumerable<Room> GetAllRoom()
        {
            try
            {
                return PlutoContext.rooms.Include("hostel").ToList();
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                return new List<Room>();
            }
        }

    }
}