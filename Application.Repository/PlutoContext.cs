using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Application.Repository
{
    public class PlutoContext : DbContext
    {
        public DbSet<AppUser> appusers { get; set; }
        public DbSet<Student> students { get; set; }
        public DbSet<StudentClass> studentclasses { get; set; }
        public DbSet<StudentSubject> studentsubjects { get; set; }
        public DbSet<StudentStatus> studentstatuses { get; set; }
        public DbSet<Employee> employees { get; set; }
        public DbSet<EmployeeCategory> employeecategories { get; set; }
        public DbSet<EmployeeLevelOfEducation> employeelevelsofeducation { get; set; }
        public DbSet<EmployeeDocument> employeedocuments { get; set; }
        public DbSet<Payment> payments { get; set; }
        public DbSet<PaymentHistory> paymenthistories { get; set; }
        public DbSet<PayrollAmount> payrollamounts { get; set; }
        public DbSet<PayrollRate> payrollrates { get; set; }
        public DbSet<TaxRate> taxrates { get; set; }
        public DbSet<SSNITRate> ssnitrates { get; set; }
        public DbSet<Department> departments { get; set; }
        public DbSet<Region> regions { get; set; }
        public DbSet<PayrollAllowance> payrollallowances { get; set; }
        public DbSet<EmployeeType> employeetypes { get; set; }
        public DbSet<EmployeeLoan> employeeloans { get; set; }
        public DbSet<EmployeeLoanHistory> employeeloanhistories { get; set; }
        public DbSet<Exam> exams { get; set; }
        public DbSet<Mark> marks { get; set; }
        public DbSet<Hostel> hostels { get;set;}
        public DbSet<Library> libraries { get;set;}
        public DbSet<Transport> transports { get;set;}
        public DbSet<Expense> expenses { get;set;}
        public DbSet<ExpenseCategory> expensecategories { get;set;}
        public DbSet<Income> incomes { get;set;}
        public DbSet<IncomeCategory> incomecategories { get;set;}
        public DbSet<Book> books { get;set; }
        public DbSet<BookType> booktypes { get;set;}
        public DbSet<Room> rooms { get; set; }
        public DbSet<PayrollDate> payrolldates { get; set; }
        public DbSet<Allowance> allowances { get; set; }
        public DbSet<AppUserRole> appuserroles { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<AppUser>()
                .MapToStoredProcedures();

            modelBuilder.Entity<EmployeeType>()
                .MapToStoredProcedures();

            modelBuilder.Entity<Student>()
                .MapToStoredProcedures();

            modelBuilder.Entity<StudentClass>()
                .MapToStoredProcedures()
                .HasMany(r => r.classsubjects)
                .WithRequired(r => r.studentclass)
                .HasForeignKey(r => r.studentclassid)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<StudentSubject>()
                .MapToStoredProcedures();

            modelBuilder.Entity<StudentStatus>()
                .MapToStoredProcedures();

            modelBuilder.Entity<Employee>()
                .MapToStoredProcedures();

            modelBuilder.Entity<EmployeeCategory>()
                .MapToStoredProcedures();

            modelBuilder.Entity<EmployeeLevelOfEducation>()
                .MapToStoredProcedures();

            modelBuilder.Entity<EmployeeDocument>()
                .MapToStoredProcedures();

            modelBuilder.Entity<Payment>()
                .MapToStoredProcedures();

            modelBuilder.Entity<PaymentHistory>()
                .MapToStoredProcedures();

            modelBuilder.Entity<Allowance>()
                .MapToStoredProcedures();

            modelBuilder.Entity<PayrollAmount>()
                .MapToStoredProcedures()
                .HasMany(r => r.allowances)
                .WithRequired(r => r.payrollamount)
                .HasForeignKey(r => r.payrollamountId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PayrollAllowance>()
                .MapToStoredProcedures();

            modelBuilder.Entity<PayrollRate>()
                .MapToStoredProcedures();

            modelBuilder.Entity<TaxRate>()
                .MapToStoredProcedures();

            modelBuilder.Entity<SSNITRate>()
                .MapToStoredProcedures();

            modelBuilder.Entity<Department>()
                .MapToStoredProcedures();

            modelBuilder.Entity<Region>()
                .MapToStoredProcedures();

            modelBuilder.Entity<EmployeeLoan>()
                .MapToStoredProcedures();

            modelBuilder.Entity<EmployeeLoanHistory>()
                .MapToStoredProcedures();

            modelBuilder.Entity<Exam>()
                .MapToStoredProcedures()
                .HasMany(r => r.marks)
                .WithRequired(r => r.exam)
                .HasForeignKey(r => r.examId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Mark>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<IncomeCategory>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<Income>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<BookType>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<Book>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<ExpenseCategory>()
                    .MapToStoredProcedures();
            modelBuilder.Entity<Expense>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<Hostel>()
                    .MapToStoredProcedures()
                    .HasMany(r => r.rooms)
                    .WithRequired(r => r.hostel)
                    .HasForeignKey(r => r.hostelId)
                    .WillCascadeOnDelete(false);

            modelBuilder.Entity<Library>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<Transport>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<Room>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<PayrollDate>()
                    .MapToStoredProcedures();

            modelBuilder.Entity<AppUserRole>()
                    .MapToStoredProcedures();

            base.OnModelCreating(modelBuilder);
        }
        
    }
}