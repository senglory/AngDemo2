using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;

using CPAngular2.Business.Entities;
using CPAngular2.Interfaces;
using CPAngular2.Business.Common;

using FluentValidation.Results;
using NLog;
using AutoMapper;



namespace CPAngular2.Business
{
    public class CustomerBusinessService
    {
        readonly MapperConfiguration config;
        readonly IMapper mapper;
        ICustomerDataService _customerDataService;

        static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Constructor
        /// </summary>
        public CustomerBusinessService(ICustomerDataService customerDataService)
        {
            _customerDataService = customerDataService;

            config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Customer, CustomerDTO>()
                    .ForMember(d => d.AddressLine1, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.AddressLine1 == "NULL") return string.Empty;
                            return ls.AddressLine1;
                        }
                    }))
                    .ForMember(d => d.AddressLine2, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.AddressLine2 == "NULL") return string.Empty;
                            return ls.AddressLine2;
                        }
                    }))
                    .ForMember(d => d.Salutation, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.Salutation == "NULL") return string.Empty;
                            return ls.Salutation;
                        }
                    }))
                    .ForMember(d => d.Abteilung, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.Abteilung == "NULL") return string.Empty;
                            return ls.Abteilung;
                        }
                    }))
                    .ForMember(d => d.City, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.City == "NULL") return string.Empty;
                            return ls.City;
                        }
                    }))
                    .ForMember(d => d.CompanyVorname, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.CompanyVorname == "NULL") return string.Empty;
                            return ls.CompanyVorname;
                        }
                    }))
                    .ForMember(d => d.CompanyName, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.CompanyName == "NULL") return string.Empty;
                            return ls.CompanyName;
                        }
                    }))
                    .ForMember(d => d.CustomerCode, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.CustomerCode == "NULL") return string.Empty;
                            return ls.CustomerCode;
                        }
                    }))
                    .ForMember(d => d.PhoneNumber, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.PhoneNumber == "NULL") return string.Empty;
                            return ls.PhoneNumber;
                        }
                    }))
                    .ForMember(d => d.PhoneNumber2, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.PhoneNumber2 == "NULL") return string.Empty;
                            return ls.PhoneNumber2;
                        }
                    }))
                    .ForMember(d => d.Fax, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.Fax == "NULL") return string.Empty;
                            return ls.Fax;
                        }
                    }))
                    .ForMember(d => d.EMail, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.EMail == "NULL") return string.Empty;
                            return ls.EMail;
                        }
                    }))
                    .ForMember(d => d.State, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.State == "NULL") return string.Empty;
                            return ls.State;
                        }
                    }))
                    .ForMember(d => d.ZipCode, op => op.ResolveUsing(ctx =>
                    {
                        {
                            var ls = ctx;
                            if (ls.ZipCode == "NULL") return string.Empty;
                            return ls.ZipCode;
                        }
                    }));
                cfg.CreateMap<CustomerDTO, Customer>();
                cfg.CreateMap<CustomerDienstDTO, CustomerDienst>();
                cfg.CreateMap<CustomerDienst, CustomerDienstDTO>();
                cfg.IgnoreUnmapped();
            });
            config.AssertConfigurationIsValid();
            mapper = config.CreateMapper();
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
        /// <param name="dto"></param>
        /// <param name="transaction"></param>
        public void UpdateCustomer(CustomerDTO dto, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();

            Customer customer;

            try
            {
                customer = mapper.Map<CustomerDTO, Customer>(dto);

                //customer.CustomerID = ci.CustomerID;
                //customer.Abteilung = ci.Abteilung;
                //customer.CustomerCode = ci.CustomerCode;
                //customer.CompanyName = ci.CompanyName;
                //customer.CompanyVorname = ci.CompanyVorname;
                //customer.Salutation = ci.Salutation;
                //customer.Photo = ci.Photo;
                //customer.AddressLine1 = ci.AddressLine1;
                //customer.City = ci.City;
                //customer.ZipCode = ci.ZipCode;
                //customer.State = ci.State;
                //customer.PhoneNumber2 = ci.PhoneNumber2;
                //customer.EMail = ci.EMail;

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

                if (dto.CustomerID == 0)
                {
                    customer = mapper.Map<CustomerDTO, Customer>(dto);

                    _customerDataService.CreateCustomer(customer);
                    _customerDataService.CommitTransaction(true);

                    dto.CustomerID = customer.CustomerID;

                    transaction.ReturnStatus = true;
                    transaction.ReturnMessage.Add("Provider was successfully created at " + DateTime.Now.ToString());
                }
                else
                {
                    // !!!!!!! AUTOMAPPER
                    Customer existingCustomer = _customerDataService.GetCustomer(dto.CustomerID);

                    existingCustomer = mapper.Map<CustomerDTO, Customer>(dto);

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
                customers = _customerDataService.GetCustomers(customerCode, companyName, currentPageNumber, pageSize, sortDirection, sortExpression, out totalRows);
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
                ci = mapper.Map<Customer, CustomerDTO>(customer);
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
