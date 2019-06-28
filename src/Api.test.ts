import Api from './Api';
import mockData from './MockApiData';

describe("Mock Data", () => {
  it("uses default mock data", () => {
    const apiKey = new Api().getApiKey();
    expect(apiKey).toEqual(mockData.ApiKey);
  });

  it("uses custom mock data", () => {
    const customApiKey = 'custom-' + mockData.ApiKey;
    const apiKey = new Api({ ApiKey: customApiKey }).getApiKey();
    expect(apiKey).toEqual(customApiKey);
  });
});
