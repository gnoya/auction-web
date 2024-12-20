/* eslint-disable*/

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '.d.ts',
    '.js',
    'node_modules',
    'dist',
    'coverage',
    'src/config',
    'src/database',
    'src/errors',
    'src/helpers',
    'src/middlewares',
    'src/repositories',
    'src/routes',
    'src/schemas',
    'src/services',
    'src/transforms',
    'src/utils',
    'src/validators',
  ],
  moduleNameMapper: {
    '@/config/(.*)': '<rootDir>/src/config/$1',
    '@/controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@/services/(.*)': '<rootDir>/src/services/$1',
    '@/middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@/repositories/(.*)': '<rootDir>/src/repositories/$1',
    '@/transforms/(.*)': '<rootDir>/src/transforms/$1',
    '@/validators/(.*)': '<rootDir>/src/validators/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
    '@/errors/(.*)': '<rootDir>/src/errors/$1',
    '@/database/(.*)': '<rootDir>/src/database/$1',
    '@/schemas/(.*)': '<rootDir>/src/schemas/$1',
    '@/routes/(.*)': '<rootDir>/src/routes/$1',
    '@/types/(.*)': '<rootDir>/src/types/$1',
    '@/broadcaster/(.*)': '<rootDir>/src/broadcaster/$1',
  },
}
