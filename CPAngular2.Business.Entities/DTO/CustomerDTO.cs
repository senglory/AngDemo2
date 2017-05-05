using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeProjectAngular2.Business.Entities
{
    public class CustomerDTO: _BaseDTO
    {
        public int CustomerID { get; set; }
        public string Salutation { get; set; }
        public string CompanyVorname { get; set; }
        public string CustomerCode { get; set; }
        public string Abteilung { get; set; }
        public string CompanyName { get; set; }

        // address class
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

        public string PhoneNumber { get; set; }
        public string PhoneNumber2 { get; set; }
        public string Fax { get; set; }
        public string EMail { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string Photo { get; set; }
    }
}
