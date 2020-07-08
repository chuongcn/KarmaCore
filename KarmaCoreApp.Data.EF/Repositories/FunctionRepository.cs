using KarmaCoreApp.Data.Entities;
using KarmaCoreApp.Data.IRepositories;

namespace KarmaCoreApp.Data.EF.Repositories
{
    public class FunctionRepository : EFRepository<Function, string>, IFunctionRepository
    {
        public FunctionRepository(AppDbContext context) : base(context)
        {
        }
    }
}