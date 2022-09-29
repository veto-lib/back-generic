import { Repository } from 'typeorm';

import { CreateAnimalType } from './animals.schema';
import { Animal } from '../../animals/animal';

const create = async (
  repository: Repository<Animal>,
  animal: CreateAnimalType
): Promise<Animal> => {
  return repository.save({ ...animal, animals: [] });
};

const findAnimal = async (
  repository: Repository<Animal>,
  animalId: string
): Promise<Animal | null> => {
  return repository.findOne({
    where: { id: animalId },
    relations: [ 'customer' ]
  });
};

const findAnimals = async (
  repository: Repository<Animal>
): Promise<Animal[]> => {
  return repository.find({
    relations: [ 'customer' ]
  });
};

export default { create, findAnimal, findAnimals };
