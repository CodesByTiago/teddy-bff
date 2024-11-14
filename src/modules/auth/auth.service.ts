/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UsertDTO } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDTO: UsertDTO) {
    const user = await this.usersService.findByEmail(userDTO.email);

    if (user) {
      throw new HttpException(
        'Usuário já está cadastrado!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    return this.usersService.createUser({
      ...userDTO,
      password: hashedPassword,
    });
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    const comparePass = await bcrypt.compare(pass, user.password);
    if (!comparePass) {
      throw new UnauthorizedException('E-mail ou senha incorretos!');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
