using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeProjectAngular2.Business.Entities
{
    public class CustomerDienst
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ObjectID { get; set; }

        public int CustomerID { get; set; }
        [ForeignKey("CustomerID")]
        //[InverseProperty("CustomerID")]
        public Customer Customer { get; set; }
        public Dienstype Dienstype { get; set; }
        public string DienstOder { get; set; }
    }
}
