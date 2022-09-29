import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { Event } from '../../../events/event';
import { Customer } from '../../customer';
import { Veterinary } from '../../../veterinaries/veterinary';
import { Animal } from '../../../animals/animal';

import eventsService from './events.service';

import { getUser } from '../../../../utils';

const findAnimalEvents = async (
  dataSource: DataSource,
  request: Request
): Promise<Event[]> => {
  const eventRepository = dataSource.getRepository(Event);
  const customerRepository = dataSource.getRepository(Customer);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const animalRepository = dataSource.getRepository(Animal);
  const user = getUser(request);
  const { customerId, animalId } = request.params;

  const veterinaries = await veterinaryRepository.find();

  const customer = await customerRepository.findOne({
    where: {
      email: customerId
    }
  });

  const animal = await animalRepository.findOne({
    where: {
      id: animalId
    }
  });

  if (!customer || !animal) {
    throw createHttpError(404, 'No data found for current settings');
  }

  if (customer.email !== user.email && !veterinaries.find(v => v.email === user.email)) {
    throw createHttpError(403, 'Forbidden');
  }

  return eventsService.findAnimalEvents(eventRepository, customerId, animalId);
};

export default { findAnimalEvents };
