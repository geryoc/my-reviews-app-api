import * as dotenv from 'dotenv';
import * as path from 'path';

function loadTestEnvironmentVariables() {
  dotenv.config({
    path: path.resolve(__dirname, '..', '..', '.env.test.local'),
  });
}

loadTestEnvironmentVariables();
