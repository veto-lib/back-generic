import { Repository } from 'typeorm';

import { Event } from '../../events/event';
import { Veterinary } from '../veterinary';

const findVeterinaryEvents = async (
  repository: Repository<Event>,
  email: Veterinary['email']
): Promise<Event[]> => {
  return repository.find({
    where: {
      veterinary: {
        email
      }
    },
    relations: [ 'veterinary', 'animal', 'customer' ]
  });
};

export default { findVeterinaryEvents };
