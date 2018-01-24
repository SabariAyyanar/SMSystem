using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class IncomeRepository : Repository<Income>,IIncomeRepository
    {
        public IncomeRepository(PlutoContext context) : base(context)
             {

        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public IEnumerable<Income> GetAllIncomes()
        {
            return PlutoContext.incomes.Include("incomecategory").ToList();
        }
    }
}