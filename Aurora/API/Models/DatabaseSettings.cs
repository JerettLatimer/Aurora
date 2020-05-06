using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string Geodata_CollectionName { get; set; }
        public string Tasks_CollectionName { get; set; }
        public string Subscriptions_CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDatabaseSettings
    {
        string Geodata_CollectionName { get; set; }
        string Tasks_CollectionName { get; set; }
        string Subscriptions_CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
