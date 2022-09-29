import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { validateSchema, getUser } from '../../utils';

import clinicSchema from './clinic.schema';
import clinicService from './clinic.service';

import { Clinic } from './clinic';
import { Veterinary } from '../veterinaries/veterinary';

const findClinicInfo = async (
  dataSource: DataSource,
  request: Request
): Promise<Clinic> => {
  const clinicRepository = dataSource.getRepository(Clinic);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const user = getUser(request);

  const veterinary = await veterinaryRepository.findOne({
    where: { email: user.email }
  });

  if (!veterinary) {
    throw createHttpError(404, 'Invalid veterinary email');
  }

  const info = await clinicService.findClinicInfo(clinicRepository);

  return info;
};

const updateClinicInfo = async (
  dataSource: DataSource,
  request: Request
): Promise<Clinic> => {
  const clinicRepository = dataSource.getRepository(Clinic);
  const veterinaryRepository = dataSource.getRepository(Veterinary);
  const user = getUser(request);

  const updatedInformation = validateSchema(
    clinicSchema.updateClinicInformationsSchema,
    request.body
  );

  const veterinary = await veterinaryRepository.findOne({
    where: { email: user.email }
  });

  if (!veterinary) {
    throw createHttpError(404, 'Invalid veterinary email');
  }

  return clinicService.updateClinicInfo(clinicRepository, updatedInformation);
};

export default { findClinicInfo, updateClinicInfo };
