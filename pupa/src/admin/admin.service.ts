import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

import { Admin } from '../models/Admin.model';
import { Role } from '../models/role.model';

import { hashPassword } from './admin.utils';

import {
  AdminWithoutPassword,
  FullAdmin,
  FullRole,
  NewAdmin,
  NewCreatedUser,
} from '../dtos/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly admin: typeof Admin,
    @InjectModel(Role)
    private readonly role: typeof Role,
  ) {}

  async create(admin: NewAdmin): Promise<NewCreatedUser> {
    const { password, ...rest } = admin;
    const checkAdmin = await this.admin.findOne({
      where: { email: rest.email },
    });

    if (checkAdmin) {
      throw new HttpException(
        'Администратор с этим пользователем уже существет',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id, username, email, firstName, lastName } =
      await this.admin.create({
        id: uuidv4(),
        password: hashPassword(password),
        role: 1,
        ...rest,
      });

    return { id, username, email, firstName, lastName };
  }

  async findOneAdmin(email: string): Promise<FullAdmin> {
    return await this.admin.findOne({ where: { email } });
  }

  async findOneAdminWtPass(email: string): Promise<AdminWithoutPassword> {
    return await this.admin.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }

  async findRole(roleId: number): Promise<FullRole> {
    return await this.role.findOne({ where: { id: roleId } });
  }
}
