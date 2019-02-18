module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
    AIRTABLE_API_KEY: '1',
    AIRTABLE_BASE_ID: '2'
  },
};
