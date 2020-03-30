using KarmaCoreApp.Data.Enums;

namespace KarmaCoreApp.Data.Interfaces
{
    public interface ISwitchable
    {
        Status Status { set; get; }
    }
}