namespace CodeProjectAngular2.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangePhotoField : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customers", "Photo", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Customers", "Photo", c => c.Binary(storeType: "image"));
        }
    }
}
