using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;

using CodeProjectAngular2.Business.Entities;
using CodeProjectAngular2.Interfaces;
using CodeProjectAngular2.Business.Common;

using FluentValidation.Results;
using NLog;


namespace CodeProjectAngular2.Business
{
    public class CustomerBusinessService
    {
        private ICustomerDataService _customerDataService;

        static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Constructor
        /// </summary>
        public CustomerBusinessService(ICustomerDataService customerDataService)
        {
            _customerDataService = customerDataService;
        }

        /// <summary>
        /// Import Customers
        /// </summary>
        /// <param name="transaction"></param>
        public void ImportCustomers(out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            try
            {

                string importFileName = ConfigurationManager.AppSettings["CustomerImportData"];

                System.IO.StreamReader csv_file = File.OpenText(importFileName);

                _customerDataService.CreateSession();
                _customerDataService.BeginTransaction();

                Boolean firstLine = true;
                int customerRecordsAdded = 0;

                while (csv_file.Peek() >= 0)
                {
                    // read and add a line
                    string line = csv_file.ReadLine();
                    string[] columns = line.Split('\t');
                    if (firstLine == false)
                    {
                        if (ImportCustomer(columns) == true)
                            customerRecordsAdded++;
                    }
                    firstLine = false;
                }

                _customerDataService.CommitTransaction(true);

                csv_file.Close();

                transaction.ReturnStatus = true;
                transaction.ReturnMessage.Add(customerRecordsAdded.ToString() + " provider successfully imported.");

            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                _customerDataService.CloseSession();
            }
        }

        /// <summary>
        /// Import Customer
        /// </summary>
        /// <param name="columns"></param>
        /// <returns></returns>
        private Boolean ImportCustomer(string[] columns)
        {

            Customer customer = new Customer();

            customer.CustomerCode = ReplaceNullValue(columns[0].Trim());
            customer.CompanyName = ReplaceNullValue(columns[1].Trim());
            customer.AddressLine1 = ReplaceNullValue(columns[4].Trim());
            customer.AddressLine2 = string.Empty;
            customer.City = ReplaceNullValue(columns[5].Trim());
            customer.State = ReplaceNullValue(columns[6].Trim());
            customer.ZipCode = ReplaceNullValue(columns[7].Trim());
            customer.PhoneNumber = ReplaceNullValue(columns[9].Trim());

            Boolean valid = _customerDataService.ValidateDuplicateCustomer(customer.CustomerCode);
            if (valid)
            {
                _customerDataService.CreateCustomer(customer);
            }

            return valid;

        }


        /// <summary>
        /// Update Customer
        /// </summary>
        /// <param name="ci"></param>
        /// <param name="transaction"></param>
        public void UpdateCustomer(CustomerDTO ci, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            Customer customer = new Customer();

            try
            {
                // !!!!!!! AUTOMAPPER
                customer.CustomerID = ci.CustomerID;
                customer.Abteilung = ci.Abteilung;
                customer.CustomerCode = ci.CustomerCode;
                customer.CompanyName = ci.CompanyName;
                customer.CompanyVorname = ci.CompanyVorname;
                customer.Salutation = ci.Salutation;
                customer.Photo = ci.Photo;
                customer.AddressLine1 = ci.AddressLine1;
                customer.City = ci.City;
                customer.ZipCode = ci.ZipCode;
                customer.State = ci.State;
                customer.PhoneNumber2 = ci.PhoneNumber2;
                customer.EMail = ci.EMail;

                CustomerValidator customerBusinessRules = new CustomerValidator(_customerDataService, customer);
                ValidationResult results = customerBusinessRules.Validate(customer);

                bool validationSucceeded = results.IsValid;
                IList<ValidationFailure> failures = results.Errors;

                if (validationSucceeded == false)
                {
                    transaction = ValidationErrors.PopulateValidationErrors(failures);
                    return;
                }

                _customerDataService.CreateSession();
                _customerDataService.BeginTransaction();

                if (ci.CustomerID == 0 )
                {
                    // !!!!!!! AUTOMAPPER
                    customer.Salutation = ci.Salutation;
                    customer.Abteilung = ci.Abteilung;
                    customer.CompanyVorname = ci.CompanyVorname;
                    customer.CompanyName = ci.CompanyName;
                    customer.AddressLine1 = ci.AddressLine1;
                    customer.AddressLine2 = ci.AddressLine2;
                    customer.City = ci.City;
                    customer.State = ci.State;
                    customer.ZipCode = ci.ZipCode;
                    customer.Fax = ci.Fax;
                    customer.PhoneNumber = ci.PhoneNumber;
                    customer.PhoneNumber2 = ci.PhoneNumber2;
                    customer.EMail = ci.EMail;
                    customer.Photo = ci.Photo;
                    _customerDataService.CreateCustomer(customer);
                    _customerDataService.CommitTransaction(true);

                    ci.CustomerID = customer.CustomerID;

                    transaction.ReturnStatus = true;
                    transaction.ReturnMessage.Add("Provider was successfully created at " + DateTime.Now.ToString());
                }
                else
                {
                    // !!!!!!! AUTOMAPPER
                    Customer existingCustomer = _customerDataService.GetCustomer(ci.CustomerID);
                    existingCustomer.Salutation = ci.Salutation;
                    existingCustomer.Abteilung = ci.Abteilung;
                    existingCustomer.CustomerCode = ci.CustomerCode;
                    existingCustomer.CompanyVorname = ci.CompanyVorname;
                    existingCustomer.CompanyName = ci.CompanyName;
                    existingCustomer.AddressLine1 = ci.AddressLine1;
                    existingCustomer.AddressLine2 = ci.AddressLine2;
                    existingCustomer.City = ci.City;
                    existingCustomer.State = ci.State;
                    existingCustomer.ZipCode = ci.ZipCode;
                    existingCustomer.Fax = ci.Fax;
                    existingCustomer.PhoneNumber = ci.PhoneNumber;
                    existingCustomer.PhoneNumber2 = ci.PhoneNumber2;
                    existingCustomer.EMail = ci.EMail;
                    existingCustomer.Photo = ci.Photo;

                    _customerDataService.UpdateCustomer(existingCustomer);
                    _customerDataService.CommitTransaction(true);

                    transaction.ReturnStatus = true;
                    transaction.ReturnMessage.Add("Provider was successfully updated at " + DateTime.Now.ToString());
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                string errorMessage = ex.Message;
                transaction.ReturnMessage.Add(errorMessage);
                transaction.ReturnStatus = false;
            }
            finally
            {
                _customerDataService.CloseSession();
            }
        }




        /// <summary>
        /// Get Customers
        /// </summary>
        /// <param name="customerCode"></param>
        /// <param name="companyName"></param>
        /// <param name="currentPageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortDirection"></param>
        /// <param name="sortExpression"></param>
        /// <param name="totalRows"></param>
        /// <returns></returns>
        public List<Customer> GetCustomers(string customerCode, string companyName, int currentPageNumber, int pageSize, string sortDirection, string sortExpression, out int totalRows, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            List<Customer> customers = new List<Customer>();

            totalRows = 0;

            try
            {
                _customerDataService.CreateSession();
                customers = _customerDataService.GetCustomers(customerCode, companyName, currentPageNumber,pageSize, sortDirection,sortExpression, out totalRows);
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                _customerDataService.CloseSession();
            }

            return customers;

        }

        /// <summary>
        /// Get Customer
        /// </summary>
        /// <param name="customerID"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public CustomerDTO GetCustomer(int customerID, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            var ci = new CustomerDTO();

            try
            {
                _customerDataService.CreateSession();
                Customer customer = _customerDataService.GetCustomer(customerID);
                ci = PopulateCustomerInformation(customer);
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                _customerDataService.CloseSession();
            }

            return ci;

        }

        /// <summary>
        /// Populate Customer Information
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        private CustomerDTO PopulateCustomerInformation(Customer customer)
        {
            // !!!!!!! AUTOMAPPER
            var ci = new CustomerDTO();
            ci.AddressLine1 = ReplaceNullValue(customer.AddressLine1);
            ci.AddressLine2 = ReplaceNullValue(customer.AddressLine2);
            ci.Salutation = ReplaceNullValue(customer.Salutation);
            ci.Abteilung = ReplaceNullValue(customer.Abteilung);
            ci.City = ReplaceNullValue(customer.City);
            ci.CompanyVorname = ReplaceNullValue(customer.CompanyVorname);
            ci.CompanyName = ReplaceNullValue(customer.CompanyName);
            ci.CustomerCode = ReplaceNullValue(customer.CustomerCode);
            ci.CustomerID = customer.CustomerID;
            ci.DateCreated = customer.DateCreated;
            ci.DateUpdated = customer.DateUpdated;
            ci.Fax = ReplaceNullValue(customer.Fax);
            ci.PhoneNumber = ReplaceNullValue(customer.PhoneNumber);
            ci.PhoneNumber2 = ReplaceNullValue(customer.PhoneNumber2);
            ci.EMail = ReplaceNullValue(customer.EMail);
            ci.State = ReplaceNullValue(customer.State);
            ci.ZipCode = ReplaceNullValue(customer.ZipCode);
            ci.Photo = customer.Photo;

            return ci;
        }

        /// <summary>
        /// Replace NULL value 
        /// </summary>
        /// <param name="inputString"></param>
        /// <returns></returns>
        private string ReplaceNullValue(string inputString)
        {
            if (inputString == "NULL") return string.Empty;
            return inputString;
        }
    }
}
