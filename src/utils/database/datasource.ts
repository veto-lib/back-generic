import { DataSource } from 'typeorm';

import { CONFIG } from '../../config';

import { Customer } from '../../api/customers/customer';
import { Veterinary } from '../../api/veterinaries/veterinary';
import { Event } from '../../api/events/event';
import { Document } from '../../api/documents/document';
import { Admin } from '../../api/admin/admin';
import { Clinic } from '../../api/clinic/clinic';
import { Animal } from '../../api/animals/animal';

const dataSource = new DataSource({
  type: 'postgres',
  host: CONFIG.database.host,
  port: CONFIG.database.port,
  username: CONFIG.database.user,
  password: CONFIG.database.password,
  database: CONFIG.database.dbName,
  synchronize: true,
  logging: true,
  ssl: CONFIG.database.ssl,
  entities: [ Customer, Veterinary, Clinic, Event, Document, Admin, Animal ]
});

export { dataSource };
