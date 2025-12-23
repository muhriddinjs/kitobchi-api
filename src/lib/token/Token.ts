import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { config } from 'src/config';
import { IToken } from './interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  async accessToken(payload: IToken): Promise<string> {
    return this.jwt.signAsync(payload as any, {
      secret: config.TOKEN.ACCESS_KEY,
      expiresIn: config.TOKEN.ACCESS_TIME as any,
    });
  }

  async refreshToken(payload: IToken): Promise<string> {
    return this.jwt.signAsync(payload as any, {
      secret: config.TOKEN.REFRESH_KEY,
      expiresIn: config.TOKEN.REFRESH_TIME as any,
    });
  }

  async writeCookie(
    res: Response,
    key: string,
    value: string,
    time: number,
  ): Promise<void> {
    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: Number(time) * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  async verifyToken(token: string, secretKey: string): Promise<object> {
    return this.jwt.verifyAsync(token, { secret: secretKey });
  }
}
