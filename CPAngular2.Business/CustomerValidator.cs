using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using CodeProjectAngular2.Business.Entities;
using System.Configuration;
using CodeProjectAngular2.Interfaces;

namespace CodeProjectAngular2.Business
{
    public class CustomerValidator : AbstractValidator<Customer>
    {      
        private Boolean _validCustomerCode = true;
       
        public CustomerValidator(ICustomerDataService customerDataService, Customer customer)
        {
           
            if (customer.CustomerCode != null && customer.CustomerCode.Trim().Length > 0)
            {
                customerDataService.CreateSession();
                List<Customer> customers = customerDataService.GetCustomers(customer.CustomerCode);
                customerDataService.CloseSession();
                foreach(Customer existingCustomer in customers)
                {
                    if (existingCustomer.CustomerID != customer.CustomerID)
                    {
                        _validCustomerCode = false;
                        break;
                    }
                }
            }

            RuleFor(a => a.CustomerCode).NotEmpty().WithMessage("Customer Code is required.");
            RuleFor(a => a.CompanyName).NotEmpty().WithMessage("Company Name is required.");
            RuleFor(a => a.CompanyVorname).NotEmpty().WithMessage("CompanyVorname is required.");
            RuleFor(a => a.Salutation).NotEmpty().WithMessage("Salutation is required.");
            RuleFor(a => a.Photo).NotEmpty().WithMessage("Photo is required.");
            RuleFor(a => a.AddressLine1).NotEmpty().WithMessage("AddressLine1 is required.");
            RuleFor(a => a.City).NotEmpty().WithMessage("City is required.");
            RuleFor(a => a.ZipCode).NotEmpty().WithMessage("ZipCode is required.");
            RuleFor(a => a.State).NotEmpty().WithMessage("State is required.");
            RuleFor(a => a.PhoneNumber2).NotEmpty().WithMessage("PhoneNumber2 is required.");
            RuleFor(a => a.EMail).NotEmpty().WithMessage("EMail is required.");

            RuleFor(a => a.CustomerCode).Must(ValidateDuplicateCustomerCode).WithMessage("Customer Code already exists.");

        }

        /// <summary>
        /// Validate Duplicate Customer Code
        /// </summary>
        /// <param name="customerCode"></param>
        /// <returns></returns>
        private bool ValidateDuplicateCustomerCode(string customerCode)
        {
            return _validCustomerCode;
        }

    }
}


