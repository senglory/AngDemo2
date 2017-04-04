using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeProjectAngular2.Business.Entities
{
    public class Geography
    {
        public int GeoID { get; set; }
        public string country { get; set; }
        public string zipCodeCity { get; set; }
        public int vicinity { get; set; }
    }
}
