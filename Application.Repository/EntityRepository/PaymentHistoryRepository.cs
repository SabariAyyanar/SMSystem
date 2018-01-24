using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository.EntityRepository
{
    public class PaymentHistoryRepository : Repository<PaymentHistory>, IPaymentHistoryRepository
    {
        public PaymentHistoryRepository(PlutoContext context) : base(context)
             {

        }


        public IEnumerable<PaymentHistory> GetAllPayments()
        {
            return PlutoContext.paymenthistories.Include("student").ToList();
        }
        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

       
    }
}