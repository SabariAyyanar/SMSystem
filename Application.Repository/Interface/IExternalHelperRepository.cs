using BusinessEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository.Interface
{
   public interface IExternalHelperRepository : IRepository<Exam>
    {
        void Print(Exam exam);
    }
}
