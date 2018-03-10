using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class EmployeeDataCollectionsRepository : Repository<EmployeeDataCollections>, IEmployeeDataCollectionsRepository
    {
        private ILog _ILog;
        public EmployeeDataCollectionsRepository(PlutoContext context) : base(context)
             {
            _ILog = Log.GetInstance;
        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }


    }
}