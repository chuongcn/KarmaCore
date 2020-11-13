using System;

namespace KarmaCoreApp.Infrastructure.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Call save change from DbContext
        /// </summary>
        void Commit();
    }
}