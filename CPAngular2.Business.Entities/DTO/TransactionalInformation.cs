using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace CPAngular2.Business.Entities
{
    public class TransactionalInformation : _BaseDTO
    {
        public int TotalPages { get; set; }
        public int TotalRows { get; set; }
        public int PageSize { get; set; }
        public Boolean IsAuthenicated { get; set; }
        public string SortExpression { get; set; }
        public string SortDirection { get; set; }
        public int CurrentPageNumber { get; set; }

        public TransactionalInformation()
        {
            ReturnStatus = true;
            TotalPages = 0;
            TotalPages = 0;
            PageSize = 0;
            IsAuthenicated = false;
        }
    }
}
