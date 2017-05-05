import { TransactionalInformation } from './transactionalinformation.entity';
import { Customer } from './customer.entity';

export class CustomersList extends TransactionalInformation {
    public customers: Array<Customer>;


}
