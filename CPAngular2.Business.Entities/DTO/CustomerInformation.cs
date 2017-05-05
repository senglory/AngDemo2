using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeProjectAngular2.Business.Entities
{
    public class CustomerInformation : TransactionalInformation
    {
        public string CustomerCode { get; set; }
        public string CompanyName { get; set; }

        public List<Customer> Customers { get; set; }
    }

}
