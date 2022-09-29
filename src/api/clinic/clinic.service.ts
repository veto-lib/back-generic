import { Like, Repository } from 'typeorm';

import { Clinic } from './clinic';
import { UpdateClinicInformationsType } from './clinic.schema';

const findClinicInfo = async (
  repository: Repository<Clinic>
): Promise<Clinic> => {
  return repository.findOneOrFail({ where: { name: Like('%') } });
};

const updateClinicInfo = async (
  repository: Repository<Clinic>,
  clinicInformations: UpdateClinicInformationsType
): Promise<Clinic> => {
  await repository.update(
    { name: clinicInformations.name },
    clinicInformations
  );
  return findClinicInfo(repository);
};

export default { findClinicInfo, updateClinicInfo };
