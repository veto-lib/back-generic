import { Repository } from 'typeorm';

import { Event } from './event';
import { Veterinary } from '../veterinaries/veterinary';
import { Customer } from '../customers/customer';
import { Animal } from '../animals/animal';

import { CreateEventType, UpdateNotesType } from './events.schema';

const findOne = async (
  repository: Repository<Event>,
  id: Event['id']
): Promise<Event | null> => {
  return repository.findOne({
    where: { id },
    relations: [ 'customer', 'veterinary', 'animal' ]
  });
};

const create = async (
  repository: Repository<Event>,
  event: CreateEventType,
  customer: Customer,
  veterinary: Veterinary,
  animal: Animal
): Promise<Event> => {
  return repository.save({ ...event, customer, veterinary, animal });
};

const updateNotes = async (
  repository: Repository<Event>,
  id: Event['id'],
  partial: UpdateNotesType
): Promise<Event> => {
  await repository.update({ id }, partial);
  return findOne(repository, id) as Promise<Event>;
};

const remove = async (
  repository: Repository<Event>,
  id: Event['id']
): Promise<boolean> => {
  return repository.delete({ id }).then((res) => res.affected === 1);
};

export default { findOne, create, updateNotes, remove };
