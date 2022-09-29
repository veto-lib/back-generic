import { Repository } from 'typeorm';

import { Document } from '../../../documents/document';
import { Animal } from '../../../animals/animal';
import { CreateDocumentType } from './documents.schema';
import { Customer } from '../../customer';

const findAnimalDocuments = async (
  repository: Repository<Document>,
  id: Animal['id']
): Promise<Document[]> => {
  return repository
    .find({
      where: {
        animal: {
          id
        }
      },
      relations: [ 'animal', 'customer' ]
    });
};

const postAnimalDocument = async (
  repository: Repository<Document>,
  animal: Animal,
  customer: Customer,
  document: CreateDocumentType
): Promise<void> => {
  await repository.insert({
    ...document,
    data: Buffer.from(document.data).toString('base64'),
    animal,
    customer
  });
};

export default { findAnimalDocuments, postAnimalDocument };
