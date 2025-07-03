import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IDENTITY_PROVIDER_SERVICE } from '../config/core-services.config';
import { IIdentityProviderService } from '../services/identity-provider/identity-provider.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(IDENTITY_PROVIDER_SERVICE)
    private identityProviderService: IIdentityProviderService,
  ) {
    const userPoolId = configService.get<string>('AWS_COGNITO_USER_POOL_ID');
    const region = configService.get<string>('AWS_COGNITO_REGION');

    if (!userPoolId || !region) {
      throw new Error('Cognito User Pool ID or AWS Region not configured.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
      algorithms: ['RS256'], // Cognito uses RS256 for signing tokens
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
      }),
    });
  }

  // The 'validate' method is called after the JWT is successfully validated.
  // The 'payload' contains the decoded JWT claims.
  async validate(payload: any) {
    // You can perform additional validation or fetch user data from a database here.
    // For Cognito, the 'sub' (subject) claim is the user's unique ID.
    // The 'token_use' claim tells you if it's an 'access' token or 'id' token.
    // Usually, you validate the 'access' token for API authorization.

    this.customPayloadValidation(payload);

    const userInfo = await this.identityProviderService.getUserInfo(
      payload.sub,
    );

    // Return the user object that will be attached to the request (req.user)
    return {
      ...userInfo, // Include user info fetched from Cognito
      // Add other relevant claims from the payload if needed
    };
  }

  private customPayloadValidation(payload: any) {
    if (payload.token_use !== 'access') {
      throw new UnauthorizedException(
        'Authorization error: Invalid token type. Must use access token.',
      );
    }
    const expectedClientId = this.configService.get<string>(
      'AWS_COGNITO_APP_CLIENT_ID',
    );
    if (payload.client_id !== expectedClientId) {
      throw new UnauthorizedException(
        'Authorization error: Invalid client ID.',
      );
    }
  }
}
