import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { getUser, validateSchema } from '../../utils';

import { Event } from './event';
import { Veterinary } from '../veterinaries/veterinary';
import { Customer } from '../customers/customer';
import { Animal } from '../animals/animal';

import eventsService from './events.service';
import eventsSchema from './events.schema';

const findOne = async (
  dataSource: DataSource,
  request: Request
): Promise<Event> => {
  const eventRepository = dataSource.getRepository(Event);
  const { id } = request.params;
  const user = getUser(request);

  const event = await eventsService.findOne(eventRepository, id);

  if (!event) {
    throw createHttpError(404, 'No data found for current user');
  }

  const { customer, veterinary } = event;

  if (customer.email !== user.email && veterinary.email !== user.email) {
    throw createHttpError(403, 'Forbidden');
  }

  return event;
};

const create = async (
  dataSource: DataSource,
  request: Request
): Promise<Event> => {
  const eventRepository = dataSource.getRepository(Event);
  const customerRepository = dataSource.getRepository(Customer);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const animalRepository = dataSource.getRepository(Animal);
  const user = getUser(request);
  const event = validateSchema(eventsSchema.createEventSchema, request.body);

  const customer = await customerRepository.findOne({
    where: { email: event.customer },
    relations: [ 'animals' ]
  });

  const animal = await animalRepository.findOne({
    where: { id: event.animal }
  });

  const veterinary = await veterinaryRepository.findOne({
    where: { email: event.veterinary }
  });

  const animals = customer?.animals ?? [];

  if (!customer || !veterinary || !animal) {
    throw createHttpError(
      422,
      'All party must exist to setup event properly'
    );
  }

  if (customer.email !== user.email && veterinary.email !== user.email) {
    throw createHttpError(403, 'Forbidden');
  }

  if (!animals.find((a) => a.id.toString() === event.animal.toString())) {
    throw createHttpError(403, 'Forbidden');
  }

  return eventsService.create(
    eventRepository,
    event,
    customer,
    veterinary,
    animal
  );
};

const updateNotes = async (
  dataSource: DataSource,
  request: Request
): Promise<Event> => {
  const eventRepository = dataSource.getRepository(Event);
  const { id } = request.params;
  const user = getUser(request);
  const partial = validateSchema(eventsSchema.updateNotesSchema, request.body);

  const event = await eventsService.findOne(eventRepository, id);

  if (!event) {
    throw createHttpError(404, 'No data found for current user');
  }

  const { veterinary } = event;

  if (veterinary.email !== user.email) {
    throw createHttpError(403, 'Forbidden');
  }

  return eventsService.updateNotes(eventRepository, id, partial);
};

const remove = async (
  dataSource: DataSource,
  request: Request
): Promise<boolean> => {
  const eventRepository = dataSource.getRepository(Event);
  const user = getUser(request);
  const { id } = request.params;

  const event = await eventsService.findOne(eventRepository, id);

  if (!event) {
    throw createHttpError(
      404,
      'Invalid operation for current settings or current user'
    );
  }

  const { veterinary, customer } = event;

  if (veterinary.email !== user.email && customer.email !== user.email) {
    throw createHttpError(403, 'Forbidden');
  }

  return eventsService.remove(eventRepository, id);
};

export default { findOne, create, updateNotes, remove };
