import { jest } from "@jest/globals";

export const exitWithError = jest.fn();
export const log = jest.fn();
export const baseplateFetchMocks = {};
export const baseplateFetch = async (url, init): Promise<any> => {
  const mock = baseplateFetchMocks[url];
  if (!mock) {
    throw Error(`baseplateFetch mock not set up for url '${url}'`);
  }

  delete baseplateFetchMocks[url];

  if (mock instanceof Error) {
    throw mock;
  } else if (typeof mock === "number") {
    throw Error(
      `Baseplate API for url '${url}' responded with HTTP status ${mock}`
    );
  } else if (typeof mock === "object" && mock !== null) {
    return mock;
  } else {
    throw Error(`Invalid baseplateFetch mock - is type '${typeof mock}'`);
  }
};
