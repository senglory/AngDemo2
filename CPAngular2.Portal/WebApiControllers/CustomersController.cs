using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeProjectAngular2.Business.Entities;
using CodeProjectAngular2.Interfaces;
using CodeProjectAngular2.Portal.TokenManagement;
using CodeProjectAngular2.Business;
using CodeProjectAngular2.Business.Common;
using System.Security.Claims;
using System.Security.Cryptography;
using Ninject;

namespace CodeProjectAngular2.Portal.WebApiControllers
{
    [RoutePrefix("api/customers")]
    public class CustomersController : ApiController
    {

        [Inject]
        public ICustomerDataService _customerDataService { get; set; }

        /// <summary>
        /// Import Customer
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userInformation"></param>
        /// <returns></returns>
        [Route("ImportCustomers")]
        [HttpPost]
        public HttpResponseMessage ImportCustomers(HttpRequestMessage request, [FromBody] CustomerInformation ci)
        {
            TransactionalInformation transaction = new TransactionalInformation();

            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            customerBusinessService.ImportCustomers(out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            ci = new CustomerInformation();
            ci.ReturnMessage = transaction.ReturnMessage;
            ci.ReturnStatus = transaction.ReturnStatus;

            var response = Request.CreateResponse<CustomerInformation>(HttpStatusCode.OK, ci);          
            return response;

        }

        /// <summary>
        /// Get Customers
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userInformation"></param>
        /// <returns></returns>
        [Route("GetCustomers")]
        [HttpPost]
        public HttpResponseMessage GetCustomers(HttpRequestMessage request, [FromBody] CustomerInformation ci)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            string customerCode = ci.CustomerCode;
            string companyName = ci.CompanyName;
            int currentPageNumber = ci.CurrentPageNumber;
            int pageSize = ci.PageSize;
            string sortExpression = ci.SortExpression;
            string sortDirection = ci.SortDirection;

            int totalRows = 0;

            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            List<Customer> customers = customerBusinessService.GetCustomers(customerCode, companyName, currentPageNumber, pageSize, sortDirection, sortExpression, out totalRows, out transaction);      
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            ci = new CustomerInformation();
            ci.ReturnStatus = transaction.ReturnStatus;
            ci.TotalRows = totalRows;
            ci.TotalPages = Utilities.CalculateTotalPages(totalRows, pageSize);
            ci.ReturnMessage.Add("page " + currentPageNumber + " of " + ci.TotalPages + " returned at " + DateTime.Now.ToString());
            ci.Customers = customers;

            var response = Request.CreateResponse<CustomerInformation>(HttpStatusCode.OK, ci);
            return response;

        }

        /// <summary>
        /// Get Customer
        /// </summary>
        /// <param name="request"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Route("GetCustomer")]
        [HttpPost]
        public HttpResponseMessage GetCustomer(HttpRequestMessage request, [FromBody] CustomerDTO dto)
        {
            TransactionalInformation transaction = new TransactionalInformation();

            int customerID = dto.CustomerID;

            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            dto = customerBusinessService.GetCustomer(customerID, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }
         
            dto.ReturnStatus = transaction.ReturnStatus;

            var response = Request.CreateResponse<CustomerDTO>(HttpStatusCode.OK, dto);
            return response;

        }


        /// <summary>
        /// Update Profile
        /// </summary>
        /// <param name="request"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Route("UpdateCustomer")]
        [HttpPost]
        public HttpResponseMessage UpdateCustomer(HttpRequestMessage request, [FromBody] CustomerDTO dto)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // REVERT
            //if (request.Headers.Authorization == null)
            //{
            //    transaction.ReturnMessage.Add("Your session is invalid.");
            //    transaction.ReturnStatus = false;
            //    var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.Unauthorized, transaction);
            //    return badResponse;
            //}

            //string tokenString = request.Headers.Authorization.ToString();

            //ClaimsPrincipal principal = TokenManager.ValidateToken(tokenString);

            //if (principal == null)
            //{

            //    transaction.ReturnMessage.Add("Your session is invalid.");
            //    transaction.ReturnStatus = false;
            //    var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.Unauthorized, transaction);
            //    return badResponse;
            //}
            var rd = new Random();
            if (dto.CustomerCode == null)
                dto.CustomerCode = rd.Next().ToString();

            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            customerBusinessService.UpdateCustomer(dto, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            dto.ReturnStatus = true;
            dto.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<CustomerDTO>(HttpStatusCode.OK, dto);
            return response;
        }
    }
}