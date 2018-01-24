using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repository.Interface
{
   public interface IRepository<TEntity> where TEntity:class
    {
        TEntity Get(int Id);

        void Update(Expression<Func<TEntity, bool>> predicate,TEntity entity);

        void UpdateRange(Expression<Func<TEntity, bool>> predicate, IEnumerable<TEntity> entity);
        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
        void Add(TEntity entity);

        void AddRange(IEnumerable<TEntity> entity);
      

        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entity);

    }
}
