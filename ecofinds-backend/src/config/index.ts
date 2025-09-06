import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'dev_jwt_secret',
  databaseUrl: process.env.DATABASE_URL || '',
};