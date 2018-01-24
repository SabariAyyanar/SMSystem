using Application.Repository;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Application.User.Authentication.Controllers
{
    public class PaymentController : ApiController
    {
        private UnitOfWork unitOfWork;

        public PaymentController()
        {
            unitOfWork = new UnitOfWork(new PlutoContext());
        }

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllPayment()
        {
            return Ok(unitOfWork.PaymentHistories.GetAllPayments().Where(p => p.IsTerminated == false));
        }

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetStudentPaymentDetails(int id)
        {
            return Ok(unitOfWork.Payments.Get(id));
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddPayment(PaymentHistory newpaymenthistory)
        {
            Payment newpayment = unitOfWork.Payments.Get(newpaymenthistory.studentId);
            newpayment.amountpaid += newpaymenthistory.amount;
            newpayment.amountowing -= newpaymenthistory.amount;
            unitOfWork.Payments.Update(p => p.Id == newpayment.Id,newpayment);
            unitOfWork.PaymentHistories.Add(newpaymenthistory);
            unitOfWork.Complete();
            return Ok("One new Payment Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdatePayment(PaymentHistory paymenttoupdate)
        {
            if(paymenttoupdate == null)
            {
                return Ok("Payment details supplied seems empty.");
            }
            Payment studentpayment = unitOfWork.Payments.Find(p => p.studentId == paymenttoupdate.studentId).FirstOrDefault();
            PaymentHistory previouspaymenthistory = unitOfWork.PaymentHistories.Find(p => p.Id == paymenttoupdate.Id).FirstOrDefault();
            if(studentpayment==null)
            {
                return Ok("Specified student with the attached payment not found");
            }
            else if (previouspaymenthistory==null)
            {
                return Ok("Specified payment not found");
            }

            double prevamount = previouspaymenthistory.amount;
            double intendedamount = paymenttoupdate.amount;
            
            if (prevamount > intendedamount)
            {

                studentpayment.amountpaid -= (prevamount - intendedamount);
                studentpayment.amountowing += (prevamount - intendedamount);
            }
            else
            {
                studentpayment.amountpaid += (intendedamount - prevamount);
                studentpayment.amountowing -= (intendedamount - prevamount);
            }
            Expression<Func<PaymentHistory, bool>> paymenthistoryfunc = s => s.Id == paymenttoupdate.Id;
            Expression<Func<Payment, bool>> paymentfunc = s => s.Id == studentpayment.Id;
            unitOfWork.PaymentHistories.Update(paymenthistoryfunc, paymenttoupdate);
            unitOfWork.Payments.Update(paymentfunc, studentpayment);
            unitOfWork.Complete();
            return Ok("Payment Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemovePayment(PaymentHistory paymenthistorytoremove)
        {
            PaymentHistory getpaymenttoremove = unitOfWork.PaymentHistories.Get(paymenthistorytoremove.Id);
            getpaymenttoremove.IsTerminated = true;
            unitOfWork.PaymentHistories.Update(p => p.Id == getpaymenttoremove.Id, getpaymenttoremove);
            unitOfWork.Complete();
            return Ok("PaymentHistory removed Successfully");
        }


    }
}
