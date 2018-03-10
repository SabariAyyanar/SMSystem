using Application.Repository.EntityRepository;
using Application.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PlutoContext _context;
        private ILog _ILog;
        public UnitOfWork(PlutoContext context)
        {
                _ILog = Log.GetInstance;

                _context = context;
                AppUsers = new UserRepository(context);
                Students = new StudentRepository(context);
                PaymentHistories = new PaymentHistoryRepository(context);
                Payments = new PaymentRepository(context);
                studentclasses = new StudentClassRepository(context);
                departments = new DepartmentRepository(context);
                regions = new RegionRepository(context);
                studentstatuses = new StudentStatusRepository(context);
                employees = new EmployeeRepository(context);
                employeedocuments = new EmployeeDocumentRepository(context);
                payrollamounts = new PayrollAmountRepository(context);
                employeecategories = new EmployeeCategoryRepository(context);
                employeelevelsofeducation = new EmployeeLevelOfEducationRepository(context);
                payrollrates = new PayrollRateRepository(context);
                taxrates = new TaxRateRepository(context);
                ssnitrates = new SSNITRateRepository(context);
                studentsubjects = new StudentSubjectRepository(context);
                payrollallowances = new PayrollAllowancesRepository(context);
                employeetypes = new EmployeeTypeRepository(context);
                employeeloanhistories = new EmployeeLoanHistoryRepository(context);
                employeeloans = new EmployeeLoanRepository(context);
                exams = new ExamRepository(context);
                marks = new MarkRepository(context);
                externalhelper = new ExternalHelperRepository(context);

                hostels = new HostelRepository(context);
                libraries = new LibraryRepository(context);
                transports = new TransportRepository(context);
                expenses = new ExpenseRepository(context);
                expensecategories = new ExpenseCategoryRepository(context);
                incomes = new IncomeRepository(context);
                incomecategories = new IncomeCategoryRepository(context);
                books = new BookRepository(context);
                booktypes = new BookTypeRepository(context);
                rooms = new RoomRepository(context);
                payrolldates = new PayrollDateRepository(context);
                allowances = new AllowanceRepository(context);
                studentdatacollections = new StudentDataCollectionsRepository(context);
                employeedatacollections = new EmployeeDataCollectionsRepository(context);
                appuserroles = new AppUserRoleRepository(context);

        }
        public IAppUserRoleRepository appuserroles { get; set; }
        public IStudentDataCollectionsRepository studentdatacollections { get; set; }
        public IEmployeeDataCollectionsRepository employeedatacollections { get; set; }
        public IAllowanceRepository allowances { get; set; }
        public IPayrollDateRepository payrolldates { get; set; }
        public IRoomRepository rooms { get; set; }
        public IBookTypeRepository booktypes { get; set; }
        public IBookRepository books { get; set; }
        public IHostelRepository hostels { get; set; }
        public ILibraryRepository libraries { get; set; }
        public ITransportRepository transports { get; set; }
        public IExpenseRepository expenses { get; set; }
        public IExpenseCategoryRepository expensecategories { get; set; }
        public IIncomeRepository incomes { get; set; }
        public IIncomeCategoryRepository incomecategories { get; set; }
        public IExternalHelperRepository externalhelper { get; set; }
        public IMarkRepository marks { get; set; }
        public IExamRepository exams { get; set; }
        public IEmployeeLoanRepository employeeloans { get; set; }
        public IEmployeeLoanHistoryRepository employeeloanhistories { get; set; }
        public IEmployeeTypeRepository employeetypes { get; private set; }
        public IStudentSubjectRepository studentsubjects { get; private set; }
        public IPayrollAllowancesRepository payrollallowances { get; set; }
        public IUserRepository AppUsers { get; private set; }
        public IStudentRepository Students { get; private set; }

        public IPaymentHistoryRepository PaymentHistories { get; private set; }
        public IPaymentRepository Payments { get; private set; }

        public IStudentClassRepository studentclasses { get; private set;}
        public IDepartmentRepository departments { get; private set; }

        public IRegionRepository regions { get; set; }
        public IStudentStatusRepository studentstatuses { get; set; }

        public IEmployeeRepository employees { get; set; }
        public IEmployeeDocumentRepository employeedocuments { get; set; }
        public IPayrollAmountRepository payrollamounts { get; set; }
        public IPayrollRateRepository payrollrates { get; set; }
        public IEmployeeCategoryRepository employeecategories { get; set; }
        public IEmployeeLevelOfEducationRepository employeelevelsofeducation { get; set; }
        public ITaxRateRepository taxrates { get; set; }
        public ISSNITRateRepository ssnitrates { get; set; }

        public int Complete()
        {
            try
            {
                return _context.SaveChanges();
            }
            catch(Exception ex)
            {
                _ILog.LogException(ex);
                return -1;
            }
        }

        public void Dispose()
        {
            try
            {
                _context.Dispose();
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
            }
        }
    }
}