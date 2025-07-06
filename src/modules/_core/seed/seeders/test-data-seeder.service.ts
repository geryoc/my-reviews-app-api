import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SeederService } from '../seeder.service';

@Injectable()
export class TestDataSeeder implements SeederService {
  private readonly logger = new Logger(TestDataSeeder.name);

  constructor(private readonly dataSource: DataSource) {}

  async seed(): Promise<void> {
    await this.seedUsers();
    await this.seedUserTags();
  }

  private async seedUsers(): Promise<void> {
    const userRepository = this.dataSource.getRepository('user');

    const authId = process.env.AWS_COGNITO_TEST_USER_AuthId;
    const name = 'Test User';
    const email = process.env.AWS_COGNITO_TEST_USER_EMAIL;

    const exists = await userRepository.findOne({
      where: { authId },
    });
    if (exists) {
      await userRepository.save({
        ...exists,
        authId,
        name,
        email,
      });
      this.logger.debug(`✔️ ${TestDataSeeder.name} - Updated: Test User`);
    } else {
      await userRepository.save(
        userRepository.create({
          authId,
          name,
          email,
        }),
      );
      this.logger.debug(`➕ ${TestDataSeeder.name} - Inserted: Test User`);
    }
  }

  private async seedUserTags(): Promise<void> {
    // Find the test user
    const user = await this.dataSource.getRepository('user').findOne({
      where: { authId: process.env.AWS_COGNITO_TEST_USER_AuthId },
    });

    if (!user) {
      this.logger.warn(`Test user not found, skipping tag seeding.`);
      return;
    }

    // Insert a tag for the test user
    const tagRepository = this.dataSource.getRepository('tag');
    const exists = await tagRepository.findOne({
      where: { userId: user.userId, name: 'TestTag' },
    });
    if (!exists) {
      await tagRepository.save(
        tagRepository.create({ userId: user.userId, name: 'TestTag' }),
      );
      this.logger.debug(
        `➕ ${TestDataSeeder.name} - Inserted: TestTag for Test User`,
      );
    } else {
      this.logger.debug(
        `✔️ ${TestDataSeeder.name} - TestTag already exists for Test User`,
      );
    }
  }

  async clear(): Promise<void> {
    const userRepository = this.dataSource.getRepository('user');
    await userRepository.delete({
      where: { authId: process.env.AWS_COGNITO_TEST_USER_AuthId },
    });
    this.logger.warn(`⚠️ ${TestDataSeeder.name} - cleared test users`);
  }
}
