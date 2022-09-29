import { Repository } from 'typeorm';

import { Animal } from '../../../animals/animal';
import { Event } from '../../../events/event';
import { Customer } from '../../customer';

const findAnimalEvents = async (
  repository: Repository<Event>,
  email: Customer['email'],
  animalId: Animal['id']
): Promise<Event[]> => {
  return repository.find({
    where: {
      customer: {
        email
      },
      animal: {
        id: animalId
      }
    },
    relations: [ 'customer', 'veterinary', 'animal' ]
  });
};

export default { findAnimalEvents };
