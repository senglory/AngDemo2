namespace CodeProjectAngular2.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPhoto : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Photo", c => c.Binary(storeType: "image"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "Photo");
        }
    }
}
