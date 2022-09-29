import { Repository } from 'typeorm';

import { Event } from '../../events/event';
import { Customer } from '../customer';

const findCustomerEvents = async (
  repository: Repository<Event>,
  email: Customer['email']
): Promise<Event[]> => {
  return repository.find({
    where: {
      customer: {
        email
      }
    },
    relations: [ 'customer', 'veterinary', 'animal' ]
  });
};

export default { findCustomerEvents };
