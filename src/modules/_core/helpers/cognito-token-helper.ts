import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

export async function getCognitoAccessToken(): Promise<string> {
  const AWS_COGNITO_REGION = process.env.AWS_COGNITO_REGION;
  const AWS_COGNITO_APP_CLIENT_ID = process.env.AWS_COGNITO_APP_CLIENT_ID!;
  const AWS_COGNITO_TEST_USER_EMAIL = process.env.AWS_COGNITO_TEST_USER_EMAIL!;
  const AWS_COGNITO_TEST_USER_PASSWORD =
    process.env.AWS_COGNITO_TEST_USER_PASSWORD!;

  const now = Date.now() / 1000;
  if (cachedToken && cachedToken.expiresAt > now + 60) {
    return cachedToken.accessToken;
  }

  const client = new CognitoIdentityProviderClient({
    region: AWS_COGNITO_REGION,
  });

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: AWS_COGNITO_APP_CLIENT_ID,
    AuthParameters: {
      USERNAME: AWS_COGNITO_TEST_USER_EMAIL,
      PASSWORD: AWS_COGNITO_TEST_USER_PASSWORD,
    },
  });

  const response = await client.send(command);
  if (!response.AuthenticationResult?.AccessToken) {
    throw new Error('Failed to get Cognito access token');
  }

  // Cognito tokens are valid for 1 hour by default
  cachedToken = {
    accessToken: response.AuthenticationResult.AccessToken,
    expiresAt: now + 3600,
  };
  return cachedToken.accessToken;
}
