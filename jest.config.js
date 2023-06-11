module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/src/infrastructure/test/jest.setup.js',
  ],
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
};
