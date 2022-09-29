import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { validateSchema } from '../../utils';

import { Veterinary } from './veterinary';

import veterinariesSchema from './veterinaries.schema';
import veterinariesService from './veterinaries.service';

const create = async (
  dataSource: DataSource,
  request: Request
): Promise<Veterinary> => {
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const veterinary = validateSchema(
    veterinariesSchema.createVeterinarySchema,
    request.body
  );

  const emailCheck = await veterinaryRepository.findOne({
    where: { email: veterinary.email }
  });

  if (emailCheck) {
    throw createHttpError(422, 'Email already taken');
  }

  return veterinariesService.create(veterinaryRepository, veterinary);
};

const findOne = async (
  dataSource: DataSource,
  request: Request
): Promise<Veterinary> => {
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const { email } = request.params;

  const veterinary = await veterinariesService.findOne(
    veterinaryRepository,
    email
  );

  if (!veterinary) {
    throw createHttpError(404, 'No data found');
  }

  return veterinary;
};

export default { create, findOne };
