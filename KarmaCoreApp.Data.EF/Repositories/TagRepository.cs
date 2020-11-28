using KarmaCoreApp.Data.Entities;
using KarmaCoreApp.Data.IRepositories;

namespace KarmaCoreApp.Data.EF.Repositories
{
    public class TagRepository : EFRepository<Tag, string>, ITagRepository
    {
        public TagRepository(AppDbContext context) : base(context)
        {
        }
    }
}