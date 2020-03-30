using KarmaCoreApp.Data.Enums;
using KarmaCoreApp.Data.Interfaces;
using KarmaCoreApp.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KarmaCoreApp.Data.Entities
{
    [Table("Bills")]
    public class Bill : DomainEntity<int>, ISwitchable, IDateTracking
    {
        public Bill()
        {
        }

        public Bill(string customerName, string customerAddress, string customerMobile, string customerMessage,
            PaymentMethod paymentMethod, BillStatus billStatus, Status status, Guid customerId)
        {
            CustomerName = customerName;
            CustomerAddress = customerAddress;
            CustomerMobile = customerMobile;
            CustomerMessage = customerMessage;
            PaymentMethod = paymentMethod;
            BillStatus = billStatus;
            Status = status;
            CustomerId = customerId;
        }

        public Bill(int id, string customerName, string customerAddress, string customerMobile, string customerMessage,
           PaymentMethod paymentMethod, BillStatus billStatus, Status status, Guid customerId)
        {
            Id = id;
            CustomerName = customerName;
            CustomerAddress = customerAddress;
            CustomerMobile = customerMobile;
            CustomerMessage = customerMessage;
            PaymentMethod = paymentMethod;
            BillStatus = billStatus;
            Status = status;
            CustomerId = customerId;
        }

        [MaxLength(256)]
        [Required]
        public string CustomerName { get; set; }

        [MaxLength(256)]
        [Required]
        public string CustomerAddress { get; set; }

        [MaxLength(50)]
        [Required]
        public string CustomerMobile { get; set; }

        [MaxLength(256)]
        [Required]
        public string CustomerMessage { get; set; }

        public PaymentMethod PaymentMethod { get; set; }

        public BillStatus BillStatus { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        [DefaultValue(Status.Active)]
        public Status Status { get; set; } = Status.Active;

        public Guid CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public virtual AppUser User { get; set; }

        public virtual ICollection<BillDetail> BillDetails { get; set; }
    }
}