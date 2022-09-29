import { Repository } from 'typeorm';

import { Veterinary } from './veterinary';
import { CreateVeterinaryType } from './veterinaries.schema';

const create = async (
  repository: Repository<Veterinary>,
  veterinary: CreateVeterinaryType
): Promise<Veterinary> => {
  await repository.insert(veterinary);
  return repository.findOne({
    where: { email: veterinary.email }
  }) as Promise<Veterinary>;
};

const findOne = async (
  repository: Repository<Veterinary>,
  email: Veterinary['email']
): Promise<Veterinary | null> => {
  return repository.findOne({
    where: { email }
  });
};

export default { create, findOne };
