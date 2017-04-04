namespace CodeProjectAngular2.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addEmail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Salutation", c => c.String());
            AddColumn("dbo.Customers", "PhoneNumber2", c => c.String());
            AddColumn("dbo.Customers", "Fax", c => c.String());
            AddColumn("dbo.Customers", "EMail", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "EMail");
            DropColumn("dbo.Customers", "Fax");
            DropColumn("dbo.Customers", "PhoneNumber2");
            DropColumn("dbo.Customers", "Salutation");
        }
    }
}
