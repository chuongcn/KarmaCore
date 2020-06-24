using System;

namespace KarmaCoreApp.Infrastructure.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Call SaveChange() from DbContext
        /// </summary>
        void Commit();
    }
}