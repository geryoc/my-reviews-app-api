import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err, user, info) {
    // Log the error and info for debugging
    if (err || !user) {
      this.logger.error(
        `Authentication JWT Error: ${info?.message || err?.message}`,
      );
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
