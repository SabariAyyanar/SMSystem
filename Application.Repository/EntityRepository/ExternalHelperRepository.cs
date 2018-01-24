using Application.Repository.Interface;
using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using System.Drawing.Printing;
using System.IO;

namespace Application.Repository.EntityRepository
{
    public class ExternalHelperRepository : Repository<Exam>, IExternalHelperRepository
    {
        public ExternalHelperRepository(PlutoContext context) : base(context)
             {

        }

        public PlutoContext PlutoContext
        {
            get { return Context as PlutoContext; }
        }

        public void Print(Exam exam)
        {
            print p = new print();
            p.printdoc();
        }
    }

    public class print
    {
        
        public void printdoc()
        {
            PrintDocument pd = new PrintDocument();
            pd.PrintPage += Pd_PrintPage;
            pd.Print();

        }

        private void Pd_PrintPage(object sender, PrintPageEventArgs e)
        {
            e.Graphics.DrawString("",new System.Drawing.Font("Arial",14),System.Drawing.Brushes.Black,20,20);
        }
    }
}