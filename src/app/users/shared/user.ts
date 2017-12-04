import {Address} from './address';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  occupation: string;
  age: number;
  dob: Date;
  address: Address = new Address();
}

