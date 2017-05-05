using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CPAngular2.Business.Entities;
using System.Data.Entity;

namespace CPAngular2.Data.EntityFramework
{
    /// <summary>
    /// CodeProject Entity Framework Database Context
    /// </summary>
    public class Angular2Database : DbContext
    {

        public Angular2Database(): base("Angular2Database")
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        //public DbSet<Geography> Geographys { get; set; }

        /// <summary>
        /// Model Creation
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Geography>().ToTable("dbo.Geographys");
            modelBuilder.Entity<User>().ToTable("dbo.Users");
            modelBuilder.Entity<Customer>().ToTable("dbo.Customers");


        }
    }
}
