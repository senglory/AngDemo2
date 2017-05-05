using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace CodeProjectAngular2.Business.Entities
{
    public class _BaseDTO
    {
        public bool ReturnStatus { get; set; }
        public List<String> ReturnMessage { get; set; }
        public Hashtable ValidationErrors { get; set; }

        public _BaseDTO()
        {
            ReturnMessage = new List<string>();
            ValidationErrors = new Hashtable();
        }
    }
}
