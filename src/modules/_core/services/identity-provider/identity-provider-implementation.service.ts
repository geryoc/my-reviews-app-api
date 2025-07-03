import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IIdentityProviderService,
  UserInfo,
} from './identity-provider.service';

@Injectable()
export class IdentityProviderService implements IIdentityProviderService {
  private readonly client: CognitoIdentityProviderClient;
  private readonly userPoolId: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_COGNITO_REGION');
    const accessKeyId = this.configService.get<string>(
      'AWS_COGNITO_IDP_CLIENT_ACCESS_KEY_ID',
    )!;
    const secretAccessKey = this.configService.get<string>(
      'AWS_COGNITO_IDP_CLIENT_ACCESS_KEY_SECRET',
    )!;
    this.userPoolId = this.configService.get<string>(
      'AWS_COGNITO_USER_POOL_ID',
    )!;

    this.client = new CognitoIdentityProviderClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async getUserInfo(authId: string): Promise<UserInfo> {
    try {
      const result = await this.client.send(
        new AdminGetUserCommand({
          UserPoolId: this.userPoolId,
          Username: authId,
        }),
      );

      const attributes = result.UserAttributes || [];

      const email = attributes.find((a) => a.Name === 'email')?.Value;
      const username =
        attributes.find((a) => a.Name === 'preferred_username')?.Value ??
        attributes.find((a) => a.Name === 'cognito:username')?.Value;

      return new UserInfo({ authId, email, username });
    } catch (error) {
      console.error('Failed to fetch user info from Cognito:', error);
      throw new InternalServerErrorException('Failed to fetch user identity');
    }
  }
}
