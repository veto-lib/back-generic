import { Repository } from 'typeorm';

import { Customer } from './customer';

import { CreateCustomerType } from './customers.schema';

const create = async (
  repository: Repository<Customer>,
  customer: CreateCustomerType
): Promise<Customer> => {
  await repository.insert({ ...customer, animals: [] });
  return repository.findOne({
    where: { email: customer.email },
    relations: [ 'animals' ]
  }) as Promise<Customer>;
};

const findCustomer = async (
  repository: Repository<Customer>,
  customerMail: string
): Promise<Customer | null> => {
  return repository.findOne({
    where: { email: customerMail },
    relations: [ 'animals' ]
  });
};

const findCustomers = async (
  repository: Repository<Customer>
): Promise<Customer[]> => {
  return repository.find({
    relations: [ 'animals' ]
  });
};

export default { create, findCustomer, findCustomers };
