import {

fetchMealsByArea,
fetchMealsByCuisine,
fetchDataByFirstLetter,
fetchDataByIngredient,
fetchDataById,
} from './fetchData';

const mockJson = jest.fn();
const mockFetch = jest.fn();

global.fetch = mockFetch


beforeEach(() => {
  jest.clearAllMocks();
  mockJson.mockResolvedValue({ data: 'test' });
  const originalEnv = process.env;
  process.env = {
    ...originalEnv,
    API: 'http://test-api',
  };
});

describe('fetchMealsByArea', () => {
it('returns data on success', async () => {
  (mockFetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: mockJson
  });

  const result = await fetchMealsByArea();
  expect(mockFetch).toHaveBeenCalledWith(
    'http://test-api/list.php?a=list',
    { next: { revalidate: 3600 } }
  );
  expect(result).toEqual({ data: 'test' });
});

it('throws error on fetch failure', async () => {
  mockFetch.mockResolvedValue({ ok: false });
  await expect(fetchMealsByArea()).rejects.toThrow(
    'Failed to fetch the list of areas!!'
  );
});

it('throws error on exception', async () => {
  mockFetch.mockRejectedValue(new Error('Network error'));
  await expect(fetchMealsByArea()).rejects.toThrow(
    'Failed to fetch the list of areas!!'
  );
});
});

describe('fetchMealsByCuisine', () => {
  it('returns data on success', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: mockJson });
    const result = await fetchMealsByCuisine();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://test-api/list.php?c=list',
      { next: { revalidate: 3600 } }
    );
    expect(result).toEqual({ data: 'test' });
  });

  it('throws error on fetch failure', async () => {
    mockFetch.mockResolvedValue({ ok: false });
    await expect(fetchMealsByCuisine()).rejects.toThrow(
      'Failed to fetch the list of cuisines!!'
    );
  });

  it('throws error on exception', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    await expect(fetchMealsByCuisine()).rejects.toThrow(
      'Failed to fetch the list of cuisines!!'
    );
  });
});

describe('fetchDataByFirstLetter', () => {
  it('returns data on success', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: mockJson });
    const result = await fetchDataByFirstLetter('a');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://test-api/search.php?f=a',
      { next: { revalidate: 3600 } }
    );
    expect(result).toEqual({ data: 'test' });
  });

  it('throws error on fetch failure', async () => {
    mockFetch.mockResolvedValue({ ok: false });
    await expect(fetchDataByFirstLetter('a')).rejects.toThrow(
      'Failed to fetch the data when filtering by first letter!!'
    );
  });

  it('throws error on exception', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    await expect(fetchDataByFirstLetter('a')).rejects.toThrow(
      'Failed to fetch the data when filtering by first letter!!'
    );
  });
});

describe('fetchDataByIngredient', () => {
  it('returns data on success', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: mockJson });
    const result = await fetchDataByIngredient('chicken');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://test-api/filter.php?i=chicken',
      { next: { revalidate: 3600 } }
    );
    expect(result).toEqual({ data: 'test' });
  });

  it('throws error on fetch failure', async () => {
    mockFetch.mockResolvedValue({ ok: false });
    await expect(fetchDataByIngredient('chicken')).rejects.toThrow(
      'Failed to fetch the data when filtering by ingredient!!'
    );
  });

  it('throws error on exception', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    await expect(fetchDataByIngredient('chicken')).rejects.toThrow(
      'Failed to fetch the data when filtering by ingredient!!'
    );
  });
});

describe('fetchDataById', () => {
  it('returns data on success', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: mockJson });
    const result = await fetchDataById('123');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://test-api/lookup.php?i=123',
      { next: { revalidate: 3600 } }
    );
    expect(result).toEqual({ data: 'test' });
  });

  it('throws error on fetch failure', async () => {
    mockFetch.mockResolvedValue({ ok: false });
    await expect(fetchDataById('123')).rejects.toThrow(
      'Failed to fetch the data by id!!'
    );
  });

  it('throws error on exception', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    await expect(fetchDataById('123')).rejects.toThrow(
      'Failed to fetch the data by id!!'
    );
    });
});