export const MONGODB_URI = process.env['MONGODB_URI'] as string;

if (!MONGODB_URI) {
  console.log(
    'No mongo connection string. Set MONGODB_URI environment variable.'
  );
  throw new TypeError('No mongo URI in .env');
}

export const JWT_SECRET = process.env['JWT_SECRET'] as string;

if (!JWT_SECRET) {
  console.log('No JWT secret string. Set JWT_SECRET environment variable.');
  throw new TypeError('No JWT secret in .env');
}
