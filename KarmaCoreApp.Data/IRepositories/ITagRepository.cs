﻿using KarmaCoreApp.Data.Entities;
using KarmaCoreApp.Infrastructure.Interfaces;

namespace KarmaCoreApp.Data.IRepositories
{
    public interface ITagRepository : IRepository<Tag, string>
    {
    }
}