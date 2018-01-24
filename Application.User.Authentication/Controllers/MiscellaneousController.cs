using Application.Repository;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Application.User.Authentication.Controllers
{
    public class MiscellaneousController : ApiController
    {
        private UnitOfWork unitOfWork;
        
        public MiscellaneousController()
        {
          unitOfWork =  new UnitOfWork(new PlutoContext());
        }

        //begin crud for rooms

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllRoom()
        {

            return Ok(unitOfWork.rooms.GetAllRoom().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewRoom(Room newroomtoadd)
        {
            unitOfWork.rooms.Add(newroomtoadd);
            unitOfWork.Complete();
            return Ok("One new Room Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldRoom(Room oldroomtoupdate)
        {
            unitOfWork.rooms.Update(m => m.Id == oldroomtoupdate.Id, oldroomtoupdate);
            unitOfWork.Complete();
            return Ok("Room Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldRoom(Room oldroomtoremove)
        {
            Room getroomtoremove = unitOfWork.rooms.Get(oldroomtoremove.Id);
            getroomtoremove.IsTerminated = true;
            unitOfWork.rooms.Update(p => p.Id == getroomtoremove.Id, getroomtoremove);
            unitOfWork.Complete();
            return Ok("Room removed Successfully");
        }

        // end crud for room
        //begin crud for books

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllBook()
        {

            return Ok(unitOfWork.books.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewBook(Book newbooktoadd)
        {
            unitOfWork.books.Add(newbooktoadd);
            unitOfWork.Complete();
            return Ok("One new Book Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldBook(Book oldbooktoupdate)
        {
            unitOfWork.books.Update(m => m.Id == oldbooktoupdate.Id, oldbooktoupdate);
            unitOfWork.Complete();
            return Ok("Book Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldBook(Book oldbooktoremove)
        {
            Book getbooktoremove = unitOfWork.books.Get(oldbooktoremove.Id);
            getbooktoremove.IsTerminated = true;
            unitOfWork.books.Update(p => p.Id == getbooktoremove.Id, getbooktoremove);
            unitOfWork.Complete();
            return Ok("Book removed Successfully");
        }

        // end crud for books

        //begin crud for book types

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllBookType()
        {

            return Ok(unitOfWork.booktypes.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewBookType(BookType newbookTypetoadd)
        {
            unitOfWork.booktypes.Add(newbookTypetoadd);
            unitOfWork.Complete();
            return Ok("One new Book Type Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldBookType(BookType oldbookTypetoupdate)
        {
            unitOfWork.booktypes.Update(m => m.Id == oldbookTypetoupdate.Id, oldbookTypetoupdate);
            unitOfWork.Complete();
            return Ok("Book Type Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldBookType(BookType oldbooktypetoremove)
        {
            BookType getbooktypetoremove = unitOfWork.booktypes.Get(oldbooktypetoremove.Id);
            getbooktypetoremove.IsTerminated = true;
            unitOfWork.booktypes.Update(p => p.Id == getbooktypetoremove.Id, getbooktypetoremove);
            unitOfWork.Complete();
            return Ok("Book Type removed Successfully");
        }

        // end crud for book type


        //begin crud for Income

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllIncome()
        {

            return Ok(unitOfWork.incomes.GetAllIncomes().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewIncome(Income newincometoadd)
        {
            unitOfWork.incomes.Add(newincometoadd);
            unitOfWork.Complete();
            return Ok("One new Income Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldIncome(Income oldincometoupdate)
        {
            unitOfWork.incomes.Update(m => m.Id == oldincometoupdate.Id, oldincometoupdate);
            unitOfWork.Complete();
            return Ok("Income Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldIncome(Income oldbooktypetoremove)
        {
            Income getincometoremove = unitOfWork.incomes.Get(oldbooktypetoremove.Id);
            getincometoremove.IsTerminated = true;
            unitOfWork.incomes.Update(p => p.Id == getincometoremove.Id, getincometoremove);
            unitOfWork.Complete();
            return Ok("Income removed Successfully");
        }

        // end crud for income


        //begin crud for Income category

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllIncomeCategory()
        {

            return Ok(unitOfWork.incomecategories.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewIncomeCategory(IncomeCategory newincometoadd)
        {
            unitOfWork.incomecategories.Add(newincometoadd);
            unitOfWork.Complete();
            return Ok("One new Income Category Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldIncomeCategory(IncomeCategory oldincometoupdate)
        {
            unitOfWork.incomecategories.Update(m => m.Id == oldincometoupdate.Id, oldincometoupdate);
            unitOfWork.Complete();
            return Ok("Income Category Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldIncomeCategory(IncomeCategory oldbooktypetoremove)
        {
            IncomeCategory getincomecategorytoremove = unitOfWork.incomecategories.Get(oldbooktypetoremove.Id);
            getincomecategorytoremove.IsTerminated = true;
            unitOfWork.incomecategories.Update(p => p.Id == getincomecategorytoremove.Id, getincomecategorytoremove);
            unitOfWork.Complete();
            return Ok("Income Category removed Successfully");
        }

        // end crud for income category



        //begin crud for expense

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllExpense()
        {

            return Ok(unitOfWork.expenses.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewExpense(Expense newexpensestoadd)
        {
            unitOfWork.expenses.Add(newexpensestoadd);
            unitOfWork.Complete();
            return Ok("One new Expense Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldExpense(Expense oldexpensetoupdate)
        {
            unitOfWork.expenses.Update(m => m.Id == oldexpensetoupdate.Id, oldexpensetoupdate);
            unitOfWork.Complete();
            return Ok("Expense Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldExpense(Expense oldexpensetoremove)
        {
            Expense getiexpensetoremove = unitOfWork.expenses.Get(oldexpensetoremove.Id);
            getiexpensetoremove.IsTerminated = true;
            unitOfWork.expenses.Update(p => p.Id == getiexpensetoremove.Id, getiexpensetoremove);
            unitOfWork.Complete();
            return Ok("Expense removed Successfully");
        }

        // end crud for expense


        //begin crud for expense category

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllExpenseCategory()
        {

            return Ok(unitOfWork.expensecategories.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewExpenseCategory(ExpenseCategory newexpensecategorytoadd)
        {
            unitOfWork.expensecategories.Add(newexpensecategorytoadd);
            unitOfWork.Complete();
            return Ok("One new Expense Category Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldExpenseCategory(ExpenseCategory oldexpensecategorytoupdate)
        {
            unitOfWork.expensecategories.Update(m => m.Id == oldexpensecategorytoupdate.Id, oldexpensecategorytoupdate);
            unitOfWork.Complete();
            return Ok("Expense Category Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldExpenseCategory(ExpenseCategory oldexpensecategorytoremove)
        {
            ExpenseCategory getiexpensecateogrytoremove = unitOfWork.expensecategories.Get(oldexpensecategorytoremove.Id);
            getiexpensecateogrytoremove.IsTerminated = true;
            unitOfWork.expensecategories.Update(p => p.Id == getiexpensecateogrytoremove.Id, getiexpensecateogrytoremove);
            unitOfWork.Complete();
            return Ok("Expense Category removed Successfully");
        }

        // end crud for expense category


        //begin crud for Hostel

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllHostel()
        {

            return Ok(unitOfWork.hostels.GetAllHostel().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewHostel(Hostel newhosteltoadd)
        {
            unitOfWork.hostels.Add(newhosteltoadd);
            unitOfWork.Complete();
            return Ok("One new Hostel Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldHostel(Hostel oldhosteltoupdate)
        {
            unitOfWork.hostels.Update(m => m.Id == oldhosteltoupdate.Id, oldhosteltoupdate);
            unitOfWork.Complete();
            return Ok("Hostel Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldHostel(Hostel oldhosteltoremove)
        {
            Hostel gethosteltoremove = unitOfWork.hostels.Get(oldhosteltoremove.Id);
            gethosteltoremove.IsTerminated = true;
            unitOfWork.hostels.Update(p => p.Id == gethosteltoremove.Id, gethosteltoremove);
            unitOfWork.Complete();
            return Ok("Hostel removed Successfully");
        }

        // end crud for Hostel

        //begin crud for transport

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllTransport()
        {

            return Ok(unitOfWork.hostels.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewTransport(Transport newtransporttoadd)
        {
            unitOfWork.transports.Add(newtransporttoadd);
            unitOfWork.Complete();
            return Ok("One new Transport Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldTransport(Transport oldtransporttoupdate)
        {
            unitOfWork.transports.Update(m => m.Id == oldtransporttoupdate.Id, oldtransporttoupdate);
            unitOfWork.Complete();
            return Ok("Transport Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldTransport(Transport oldtransporttoremove)
        {
            Transport gettransporttoremove = unitOfWork.transports.Get(oldtransporttoremove.Id);
            gettransporttoremove.IsTerminated = true;
            unitOfWork.transports.Update(p => p.Id == gettransporttoremove.Id, gettransporttoremove);
            unitOfWork.Complete();
            return Ok("Transport removed Successfully");
        }

        // end crud for transport

        //begin crud for library

        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult GetAllLibrary()
        {

            return Ok(unitOfWork.libraries.GetAll().Where(p => p.IsTerminated == false));
        }
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult AddNewLibrary(Library newlibrarytoadd)
        {
            unitOfWork.libraries.Add(newlibrarytoadd);
            unitOfWork.Complete();
            return Ok("One new Library Successfully Added");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult UpdateOldLibrary(Library oldlibrarytoupdate)
        {
            unitOfWork.libraries.Update(m => m.Id == oldlibrarytoupdate.Id, oldlibrarytoupdate);
            unitOfWork.Complete();
            return Ok("Library Updated Successfully");
        }

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RemoveOldLibrary(Library oldlibrarytoremove)
        {
            Library getlibrarytoremove = unitOfWork.libraries.Get(oldlibrarytoremove.Id);
            getlibrarytoremove.IsTerminated = true;
            unitOfWork.libraries.Update(p => p.Id == getlibrarytoremove.Id, getlibrarytoremove);
            unitOfWork.Complete();
            return Ok("Library removed Successfully");
        }

        // end crud for lbrary



    }
}
