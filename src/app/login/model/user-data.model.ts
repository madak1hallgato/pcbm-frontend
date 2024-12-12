import { Role } from './role';

export class UserDataModel {
  username: string;
  roles: Role[];

  constructor(username: string, roles: Role[]) {
    this.username = username;
    this.roles = roles;
  }
}
