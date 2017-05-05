namespace CPAngular2.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class moreFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "CompanyVorname", c => c.String());
            AddColumn("dbo.Customers", "Abteilung", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "Abteilung");
            DropColumn("dbo.Customers", "CompanyVorname");
        }
    }
}
