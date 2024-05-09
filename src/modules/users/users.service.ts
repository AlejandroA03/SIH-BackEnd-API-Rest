import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../auth/dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { emailBody } from '../utils/email-format';
import { config as dotenvConfig } from 'dotenv';
import { JwtService } from '@nestjs/jwt';

dotenvConfig({ path: '.env' });

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async searchEmail(email: string) {
    return await this.userService.findOne({ where: { email: email } });
  }

  async searchUserName(username: string) {
    return await this.userService.findOne({ where: { username: username } });
  }

  async signUpUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 nivel hash
    const userData = {
      ...createUserDto,
      password: hashedPassword,
      lastLogin: new Date(),
    };

    const emialPayload = {
      email: createUserDto.email,
    };
    const tokenEmailVerify = this.jwtService.sign(emialPayload);
    const urlValidate = `${process.env.HOST_NAME}/email/validate/${tokenEmailVerify}`;

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUser = await queryRunner.manager.create(User, userData);
      await queryRunner.manager.save(newUser);
      await this.emailService.sendNewEmail({
        to: userData.email,
        subject: 'Bienvenido a SIH - Secure Ingress Home',
        text: emailBody(`${newUser.name} ${newUser.lastName}`, urlValidate),
      });
      await queryRunner.commitTransaction();
      const registerOkMessage = { message: `Usuario creado correctamente` };

      return registerOkMessage;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  signInUser() {
    return;
  }

  signInUpUserGoogle() {
    return;
  }
}
