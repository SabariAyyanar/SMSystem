using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class SSNITRateRepository : Repository<SSNITRate>, ISSNITRateRepository
    {
        public SSNITRateRepository(PlutoContext context) : base(context)
             {

        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }
    }
}