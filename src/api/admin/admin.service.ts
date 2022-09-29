import { Repository } from 'typeorm';

import { Admin } from './admin';

const findOne = async (
  repository: Repository<Admin>,
  email: Admin['email']
): Promise<Admin | null> => {
  return repository.findOne({
    where: { email }
  });
};

export default { findOne };
