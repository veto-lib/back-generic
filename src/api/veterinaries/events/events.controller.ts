import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { Event } from '../../events/event';
import { Veterinary } from '../veterinary';

import eventsService from './events.service';

import { getUser } from '../../../utils';

const findVeterinaryEvents = async (
  dataSource: DataSource,
  request: Request
): Promise<Event[]> => {
  const eventRepository = dataSource.getRepository(Event);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const { id } = request.params;
  const user = getUser(request);

  const veterinary = await veterinaryRepository.findOne({
    where: {
      email: id
    }
  });

  if (!veterinary) {
    throw createHttpError(404, 'No data found for current user');
  }

  if (veterinary.email !== user.email) {
    throw createHttpError(403, 'Forbidden');
  }

  return eventsService.findVeterinaryEvents(eventRepository, id);
};

export default { findVeterinaryEvents };
