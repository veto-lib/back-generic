import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { getUser } from '../../../utils';

import { Veterinary } from '../../veterinaries/veterinary';
import { Admin } from '../admin';

import veterinariesService from './veterinaries.service';

const validateVeterinary = async (
  dataSource: DataSource,
  request: Request
): Promise<void> => {
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const adminRepository = dataSource.getRepository(Admin);
  const { email } = request.params;

  const user = getUser(request);

  const isAdmin = await adminRepository.findOne({
    where: { email: user.email }
  });

  if (!isAdmin) {
    throw createHttpError(403, 'Forbidden');
  }

  const veterinaryExists = await veterinaryRepository.findOne({
    where: { email, enabled: false }
  });

  if (!veterinaryExists) {
    throw createHttpError(404, 'No unvalidated veterinary with that email');
  }

  return veterinariesService.validateVeterinary(veterinaryRepository, email);
};

const findAllUnvalidated = async (
  dataSource: DataSource,
  request: Request
): Promise<Veterinary[]> => {
  const adminRepository = dataSource.getRepository(Admin);
  const veterinaryRepository = dataSource.getRepository(Veterinary);

  const user = getUser(request);

  const isAdmin = await adminRepository.findOne({
    where: { email: user.email }
  });

  if (!isAdmin) {
    throw createHttpError(403, 'Forbidden');
  }

  return veterinariesService.findAllUnvalidated(
    veterinaryRepository
  );
};

export default { validateVeterinary, findAllUnvalidated };
