import {
  afterAll as vitestAfterAll,
  afterEach as vitestAfterEach,
  beforeAll as vitestBeforeAll,
  beforeEach as vitestBeforeEach,
  describe as vitestDescribe,
  expect as vitestExpect,
  it as vitestIt,
} from 'vitest';

declare global {
  const afterAll: typeof vitestAfterAll;
  const afterEach: typeof vitestAfterEach;
  const beforeAll: typeof vitestBeforeAll;
  const beforeEach: typeof vitestBeforeEach;
  const describe: typeof vitestDescribe;
  const expect: typeof vitestExpect;
  const it: typeof vitestIt;
}

export {};
