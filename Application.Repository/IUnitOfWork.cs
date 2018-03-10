using Application.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository
{
   public interface IUnitOfWork : IDisposable
    {
         IUserRepository AppUsers { get; }
         IStudentRepository Students { get; }
         IPaymentHistoryRepository PaymentHistories { get; }
         IPaymentRepository Payments { get; }
        IPayrollAmountRepository payrollamounts { get; set; }
        IAllowanceRepository allowances { get; }
        IPayrollDateRepository payrolldates { get; set; }
        IRoomRepository rooms { get; set; }
        IBookTypeRepository booktypes { get; set; }
        IBookRepository books { get; set; }
        IHostelRepository hostels { get; set; }
        ILibraryRepository libraries { get; set; }
        ITransportRepository transports { get; set; }
        IExpenseRepository expenses { get; set; }
        IExpenseCategoryRepository expensecategories { get; set; }
        IIncomeRepository incomes { get; set; }
        IIncomeCategoryRepository incomecategories { get; set; }
        IExternalHelperRepository externalhelper { get; set; }
        IMarkRepository marks { get; set; }
        IExamRepository exams { get; set; }
        IEmployeeLoanRepository employeeloans { get; set; }
        IEmployeeLoanHistoryRepository employeeloanhistories { get; set; }
        IEmployeeTypeRepository employeetypes { get; }
        IStudentSubjectRepository studentsubjects { get; }
        IPayrollAllowancesRepository payrollallowances { get; set; }

        IStudentClassRepository studentclasses { get; }
        IDepartmentRepository departments { get; }

        IRegionRepository regions { get; set; }
        IStudentStatusRepository studentstatuses { get; set; }

        IEmployeeRepository employees { get; set; }
        IEmployeeDocumentRepository employeedocuments { get; set; }
        IPayrollRateRepository payrollrates { get; set; }
        IEmployeeCategoryRepository employeecategories { get; set; }
        IEmployeeLevelOfEducationRepository employeelevelsofeducation { get; set; }
        ITaxRateRepository taxrates { get; set; }
        ISSNITRateRepository ssnitrates { get; set; }
        IEmployeeDataCollectionsRepository employeedatacollections { get; set; }
        IStudentDataCollectionsRepository studentdatacollections { get; set; }
        IAppUserRoleRepository appuserroles { get; set; }
        int Complete();
    }
}
