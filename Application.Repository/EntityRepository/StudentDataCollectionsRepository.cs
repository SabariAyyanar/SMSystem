using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class StudentDataCollectionsRepository : Repository<StudentDataCollections>, IStudentDataCollectionsRepository
    {
        private ILog _ILog;
        public StudentDataCollectionsRepository(PlutoContext context) : base(context)
             {

            _ILog = Log.GetInstance;

        }
        

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }


    }
}