import { DataSource } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { Admin } from './admin';

import adminService from './admin.service';

const findOne = async (
  dataSource: DataSource,
  request: Request
): Promise<Admin> => {
  const adminRepository = dataSource.getRepository(Admin);
  const { email } = request.params;

  const admin = await adminService.findOne(
    adminRepository,
    email
  );

  if (!admin) {
    throw createHttpError(404, 'No data found');
  }

  return admin;
};

export default { findOne };
