import { paginationDetails, convertToStringWithUnderscores, filterCardDetails, searchData, getCardDetails, clearCache } from './cache';
import cache from 'memory-cache';
import { fetchDataByFirstLetter, fetchDataByIngredient } from './fetchData';
import { MEMORY_NAME } from '../constants';

jest.mock('./fetchData');
jest.mock('memory-cache');

describe('Cache Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  
  it('should return correct pagination details', () => {
    const mockData = Array(25).fill({ id: '1', title: 'test' });
    const result = paginationDetails(mockData, 0);
    expect(result.pages).toBe(3);
    expect(result.pageDetails.length).toBe(12);
  });

  it('should replace spaces with underscores', () => {
    expect(convertToStringWithUnderscores('test string')).toBe('test_string');
  });

  it('should filter cards by area, category or title', () => {
    const mockData = [
      { id: '1', title: 'Pizza', area: 'Italian', category: 'Pizza', imageSrc: "" },
      { id: '2', title: 'Pasta', area: 'French', category: 'Pasta', imageSrc: ""}
    ];
    expect(filterCardDetails(mockData, 'Italian').length).toBe(1);
  });

  it('should return cached data if available', async () => {
    const mockData = [{ id: '1', title: 'test' }];
    (cache.get as jest.Mock).mockReturnValue(mockData);
    const result = await getCardDetails();
    expect(result).toEqual(mockData);
  });

  it('should fetch and cache data if not cached', async () => {
    (cache.get as jest.Mock).mockReturnValue([]);
    (fetchDataByFirstLetter as jest.Mock).mockResolvedValue({
      meals: [{ idMeal: '1', strMeal: 'test', strMealThumb: 'url', strCategory: 'cat', strArea: 'area' }]
    });
    await getCardDetails();
    expect(cache.put).toHaveBeenCalledWith(MEMORY_NAME, expect.any(Array));
  });



  it('should return meals when found by ingredient', async () => {
    const mockMeals = [{ idMeal: '1', strMeal: 'test', strMealThumb: 'url' }];
    (fetchDataByIngredient as jest.Mock).mockResolvedValue({ meals: mockMeals });
    const result = await searchData([], 'ingredient');
    expect(result).toHaveLength(1);
  });

  it('should return empty array when no meals found', async () => {
    (fetchDataByIngredient as jest.Mock).mockResolvedValue({ meals: null });
    const result = await searchData([], 'nonexistent');
    expect(result).toEqual([]);
  });



  it('should clear the cache', () => {
    clearCache();
    expect(cache.clear).toHaveBeenCalled();
  });
  
});