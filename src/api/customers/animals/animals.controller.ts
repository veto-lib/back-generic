import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { getUser, validateSchema } from '../../../utils';

import { Animal } from '../../animals/animal';
import { Veterinary } from '../../veterinaries/veterinary';
import { Customer } from '../customer';

import animalSchema from './animals.schema';

import animalsService from './animals.service';
import veterinariesService from '../../veterinaries/veterinaries.service';
import customersService from '../customers.service';

const create = async (
  dataSource: DataSource,
  request: Request
): Promise<Animal> => {
  const animalRepository = dataSource.getRepository(Animal);
  const user = getUser(request);
  const animal = validateSchema(
    animalSchema.createAnimalSchema,
    request.body
  );

  if (animal.owner !== user.email) {
    throw createHttpError(403, 'Missing rights for current user');
  }

  return animalsService.create(animalRepository, animal);
};

const findAnimal = async (
  dataSource: DataSource,
  request: Request
): Promise<Animal> => {
  const animalRepository = dataSource.getRepository(Animal);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const { animalId } =  request.params;
  const user = getUser(request);

  const animal = await animalsService.findAnimal(
    animalRepository,
    animalId
  );

  if (!animal) {
    throw createHttpError(404, 'No data found');
  }

  const veterinary = await veterinariesService.findOne(
    veterinaryRepository,
    user.email
  );

  if (!veterinary || animal.customer?.email !== user.email) {
    throw createHttpError(404, 'No data found');
  }

  return animal;
};

const findAnimals = async (
  dataSource: DataSource,
  request: Request
): Promise<Animal[]> => {
  const animalRepository = dataSource.getRepository(Animal);
  const customerRepository = dataSource.getRepository(Customer);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const user = getUser(request);

  const veterinary = await veterinariesService.findOne(
    veterinaryRepository,
    user.email
  );

  const customer = await customersService.findCustomer(
    customerRepository,
    user.email
  );

  if (!veterinary && !customer) {
    throw createHttpError(404, 'No data found');
  }

  return animalsService.findAnimals(
    animalRepository
  );
};

export default { create, findAnimal, findAnimals };
