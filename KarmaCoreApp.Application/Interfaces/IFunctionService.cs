using KarmaCoreApp.Application.ViewModels.System;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KarmaCoreApp.Application.Interfaces
{
    public interface IFunctionService : IDisposable
    {
        Task<List<FunctionViewModel>> GetAll();

        List<FunctionViewModel> GetAllByPermission(Guid userId);
    }
}