import { compare } from 'bcrypt';
import { IHashService } from '@auth/domain/hashService.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHashService implements IHashService {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}
