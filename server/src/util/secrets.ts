import {resolve} from 'path';
export const MONGODB_URI = process.env['MONGODB_URI'] as string;

if (!MONGODB_URI) {
  console.log(
    'No mongo connection string. Set MONGODB_URI environment variable.'
  );
  throw new TypeError('No mongo URI in .env');
}

export const JWT_SECRET = process.env['JWT_SECRET'] as string;
export const JWT_EXPIRATION_SECS = Number(process.env['JWT_EXPIRATION_SECS']);

if (!JWT_SECRET) {
  console.log('No JWT secret string. Set JWT_SECRET environment variable.');
  throw new TypeError('No JWT secret in .env');
}

export const GOOGLE_OAUTH2_CLIENT_ID = process.env[
  'GOOGLE_OAUTH2_CLIENT_ID'
] as string;

export const GOOGLE_OAUTH2_CLIENT_SECRET = process.env[
  'GOOGLE_OAUTH2_CLIENT_SECRET'
] as string;

export const GOOGLE_OAUTH2_CALLBACK_URL = process.env[
  'GOOGLE_OAUTH2_CALLBACK_URL'
] as string;

export const CLIENT_HOME_PAGE_URL = process.env[
  'CLIENT_HOME_PAGE_URL'
] as string;

export const HATS_STORAGE_DIR = resolve(
  process.env['HATS_STORAGE_DIR'] as string
);

export const HATS_STORAGE_ENDPOINT = resolve(
  process.env['HATS_STORAGE_ENDPOINT'] as string
);

export const ML_BINARY_CLASSIFIER_URL = process.env[
  'ML_BINARY_CLASSIFIER_URL'
] as string;
