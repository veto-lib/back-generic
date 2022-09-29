import { Repository } from 'typeorm';

import { Veterinary } from '../../veterinaries/veterinary';

const findAllUnvalidated = async (
  repository: Repository<Veterinary>
): Promise<Veterinary[]> => {
  return repository.find({
    where: { enabled: false }
  });
};

const validateVeterinary = async (
  repository: Repository<Veterinary>,
  email: Veterinary['email']
): Promise<void> => {
  await repository.update(
    {
      email
    },
    { enabled: true }
  );
};

export default { findAllUnvalidated, validateVeterinary };
