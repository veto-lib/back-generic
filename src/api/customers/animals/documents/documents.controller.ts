import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { Document } from '../../../documents/document';
import { Animal } from '../../../animals/animal';
import { Veterinary } from '../../../veterinaries/veterinary';
import { Customer } from '../../customer';

import veterinariesService from '../../../veterinaries/veterinaries.service';
import documentsService from './documents.service';
import animalsService from '../animals.service';
import customersService from '../../customers.service';

import documentsSchema from './documents.schema';

import { getUser, validateSchema } from '../../../../utils';

const findAnimalDocuments = async (
  dataSource: DataSource,
  request: Request
): Promise<Document[]> => {
  const documentRepository = dataSource.getRepository(Document);
  const animalRepository = dataSource.getRepository(Animal);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const id = request.params.animalId;
  const user = getUser(request);

  const animal = await animalsService.findAnimal(animalRepository, id);
  const veterinary = await veterinariesService.findOne(veterinaryRepository, user.email);

  if (animal?.customer.email !== user.email && !veterinary) {
    throw createHttpError(404, 'No data found');
  }

  return documentsService.findAnimalDocuments(documentRepository, id);
};

const postAnimalDocument = async (
  dataSource: DataSource,
  request: Request
): Promise<void> => {
  const documentRepository = dataSource.getRepository(Document);
  const animalRepository = dataSource.getRepository(Animal);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const customerRepository = dataSource.getRepository(Customer);
  const { animalId, customerId } = request.params;
  const user = getUser(request);
  const document = validateSchema(
    documentsSchema.createDocumentSchema,
    request.body
  );

  const animal = await animalsService.findAnimal(animalRepository, animalId);
  const customer = await customersService.findCustomer(customerRepository, customerId);
  const veterinary = await veterinariesService.findOne(veterinaryRepository, user.email);

  if (!animal || !customer || !veterinary) {
    throw createHttpError(404, 'No data found');
  }

  return documentsService.postAnimalDocument(
    documentRepository,
    animal,
    customer,
    document
  );
};

export default { findAnimalDocuments, postAnimalDocument };
