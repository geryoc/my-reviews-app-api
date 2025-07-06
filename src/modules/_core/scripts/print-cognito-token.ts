import * as dotenv from 'dotenv';
import { getCognitoAccessToken } from '../helpers/cognito-token-helper';

dotenv.config();

getCognitoAccessToken()
  .then((token) => {
    console.log('Bearer token:', token);
  })
  .catch((err) => {
    console.error('Failed to get token:', err);
    process.exit(1);
  });
