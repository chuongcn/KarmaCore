using System;

namespace KarmaCoreApp.Infrastructure.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Call SaveChange() from Db Context
        /// </summary>
        void Commit();
    }
}