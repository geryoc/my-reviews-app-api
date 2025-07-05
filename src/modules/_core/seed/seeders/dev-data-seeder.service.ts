import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { SeederService } from '../seeder.service';

@Injectable()
export class DevDataSeeder implements SeederService {
  private readonly logger = new Logger(DevDataSeeder.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seed(): Promise<void> {
    await this.seedUsers();
  }

  private async seedUsers(): Promise<void> {
    const exists = await this.userRepository.findOne({
      where: { authId: 'testauthid' },
    });
    if (exists) {
      await this.userRepository.save({
        ...exists,
        authId: 'testauthid',
        name: 'Test User',
        email: 'testuser@example.com',
      });
      this.logger.debug(`✔️ ${DevDataSeeder.name} - Updated: Test User`);
    } else {
      await this.userRepository.save(
        this.userRepository.create({
          authId: 'testauthid',
          name: 'Test User',
          email: 'testuser@example.com',
        }),
      );
      this.logger.debug(`➕ ${DevDataSeeder.name} - Inserted: Test User`);
    }
  }
}
