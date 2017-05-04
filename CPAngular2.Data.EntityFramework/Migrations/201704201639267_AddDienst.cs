namespace CodeProjectAngular2.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDienst : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CustomerDiensts",
                c => new
                    {
                        ObjectID = c.Int(nullable: false, identity: true),
                        CustomerID = c.Int(nullable: false),
                        Dienstype = c.Int(nullable: false),
                        DienstOder = c.String(),
                    })
                .PrimaryKey(t => t.ObjectID)
                .ForeignKey("dbo.Customers", t => t.CustomerID, cascadeDelete: true)
                .Index(t => t.CustomerID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CustomerDiensts", "CustomerID", "dbo.Customers");
            DropIndex("dbo.CustomerDiensts", new[] { "CustomerID" });
            DropTable("dbo.CustomerDiensts");
        }
    }
}
