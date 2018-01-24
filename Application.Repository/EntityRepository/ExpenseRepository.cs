using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class ExpenseRepository : Repository<Expense>,IExpenseRepository
    {
        public ExpenseRepository(PlutoContext context) : base(context)
             {

        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public IEnumerable<Expense> GetAllExpenses()
        {
            return PlutoContext.expenses.Include("expensecategory").ToList();
        }
    }
}