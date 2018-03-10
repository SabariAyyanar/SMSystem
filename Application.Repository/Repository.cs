using Application.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using System.Data.Entity;

namespace Application.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {

        protected readonly DbContext Context;
        private ILog _ILog;
        public Repository(DbContext context)
        {
            Context = context;
            _ILog = Log.GetInstance;
        }
        public void Add(TEntity entity)
        {
            try {
                Context.Set<TEntity>().Add(entity);
            }
            catch(Exception ex)
            {
                _ILog.LogException(ex);
            }
        }


        public void AddRange(IEnumerable<TEntity> entity)
        {
            try
            {
                Context.Set<TEntity>().AddRange(entity);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
            }
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            try
            {

                return Context.Set<TEntity>().Where(predicate);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                IEnumerable<TEntity> emptylist = new List<TEntity>();
                return emptylist;
            }
        }

        public void Update(Expression<Func<TEntity, bool>> predicate, TEntity entity)
        {
            try
            {
                var obj = Find(predicate).FirstOrDefault();
                if (obj == null)
                {
                    return;
                }
                Context.Entry(obj).CurrentValues.SetValues(entity);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
            }
        }

        public void UpdateRange(Expression<Func<TEntity, bool>> predicate, IEnumerable<TEntity> entity)
        {
            try
            {
                IEnumerable<TEntity> obj = Find(predicate);
                if (obj == null)
                {
                    return;
                }
                Context.Entry(obj).CurrentValues.SetValues(entity);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
            }
        }

        public TEntity Get(int Id)
        {
            try
            {
                return Context.Set<TEntity>().Find(Id);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                TEntity emptyobject = null;
                return emptyobject;
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            try
            {

                return Context.Set<TEntity>().ToList();
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
                IEnumerable<TEntity> emptylist = new List<TEntity>();
                return emptylist;
            }
        }

        public void Remove(TEntity entity)
        {
            try
            {

                Context.Set<TEntity>().Remove(entity);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
            }
        }

        public void RemoveRange(IEnumerable<TEntity> entity)
        {
            try
            {

                Context.Set<TEntity>().RemoveRange(entity);
            }
            catch (Exception ex)
            {
                _ILog.LogException(ex);
            }
        }
    }
}