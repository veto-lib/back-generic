import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { Event } from '../../events/event';
import { Customer } from '../customer';
import { Veterinary } from '../../veterinaries/veterinary';

import eventsService from './events.service';

import { getUser } from '../../../utils';

const findCustomerEvents = async (
  dataSource: DataSource,
  request: Request
): Promise<Event[]> => {
  const eventRepository = dataSource.getRepository(Event);
  const customerRepository = dataSource.getRepository(Customer);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const user = getUser(request);
  const { id } = request.params;

  const veterinaries = await veterinaryRepository.find();

  const customer = await customerRepository.findOne({
    where: {
      email: id
    }
  });

  if (!customer) {
    throw createHttpError(404, 'No data found for current user');
  }

  if (customer.email !== user.email && !veterinaries.find(v => v.email === user.email)) {
    throw createHttpError(403, 'Forbidden');
  }

  return eventsService.findCustomerEvents(eventRepository, id);
};

export default { findCustomerEvents };
