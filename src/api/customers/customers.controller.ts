import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { getUser, validateSchema } from '../../utils';

import { Customer } from './customer';
import { Veterinary } from '../veterinaries/veterinary';

import customersService from './customers.service';
import veterinariesService from '../veterinaries/veterinaries.service';
import customerSchema from './customers.schema';

const create = async (
  dataSource: DataSource,
  request: Request
): Promise<Customer> => {
  const customerRepository = dataSource.getRepository(Customer);
  const customer = validateSchema(
    customerSchema.createCustomerSchema,
    request.body
  );

  const customerCheck = await customerRepository.findOne({
    where: { email: customer.email }
  });

  if (customerCheck) {
    throw createHttpError(422, 'Email already taken');
  }

  return customersService.create(customerRepository, customer);
};

const findCustomer = async (
  dataSource: DataSource,
  request: Request
): Promise<Customer> => {
  const customerRepository = dataSource.getRepository(Customer);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const customerMail = request.params.id;
  const user = getUser(request);

  const veterinary = await veterinariesService.findOne(
    veterinaryRepository,
    user.email
  );

  if (!veterinary) {
    throw createHttpError(404, 'No data found');
  }

  const customer = await customersService.findCustomer(
    customerRepository,
    customerMail
  );

  if (!customer) {
    throw createHttpError(404, 'No data found for current customer');
  }

  return customer;
};

const findCustomers = async (
  dataSource: DataSource,
  request: Request
): Promise<Customer[]> => {
  const customerRepository = dataSource.getRepository(Customer);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const user = getUser(request);

  const veterinary = await veterinariesService.findOne(
    veterinaryRepository,
    user.email
  );

  if (!veterinary) {
    throw createHttpError(404, 'No data found');
  }

  return customersService.findCustomers(
    customerRepository
  );
};

export default { create, findCustomer, findCustomers };
