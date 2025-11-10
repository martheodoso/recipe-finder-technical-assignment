import { getAreas, getCuisineList, filterTags, convertToDefaultFilterData, filterPageData } from './pageFilter';
import { CardDetails, FilterType } from '../types';

describe('Page Filter Utils', () => {
  describe('getAreas', () => {
    it('should return array of areas', () => {
      const mockArea: FilterType = {
        meals: [
          { strArea: 'Italian' },
          { strArea: 'Indian' }
        ]
      };
      expect(getAreas(mockArea)).toEqual(['Italian', 'Indian']);
    });


  });

  describe('getCuisineList', () => {
    it('should return array of cuisines', () => {
      const mockCuisine: FilterType = {
        meals: [
          { strCategory: 'Seafood' },
          { strCategory: 'Vegetarian' }
        ]
      };
      expect(getCuisineList(mockCuisine)).toEqual(['Seafood', 'Vegetarian']);
    });

    
  });

  describe('filterTags', () => {
    it('should filter out selected tag', () => {
      const allTags = ['Italian', 'Indian', 'Chinese'];
      expect(filterTags(allTags, 'Italian')).toEqual(['Indian', 'Chinese']);
    });
  });

  describe('convertToDefaultFilterData', () => {
    it('should convert filters to object with checked status', () => {
      const filters = ['Italian', 'Indian'];
      const checkedFilters = ['Italian'];
      expect(convertToDefaultFilterData(filters, checkedFilters)).toEqual([
        { value: 'Italian', checked: true },
        { value: 'Indian', checked: false }
      ]);
    });

    it('should handle empty filters', () => {
      expect(convertToDefaultFilterData(undefined, null)).toEqual([]);
    });
  });

  describe('filterPageData', () => {
    const mockCards: CardDetails[] = [
      {
        area: 'Italian', category: 'Pasta',
        id: '',
        title: '',
        imageSrc: ''
      },
      {
        area: 'Indian', category: 'Curry',
        id: '',
        title: '',
        imageSrc: ''
      }
    ];

    it('should filter by both area and category when both filters present', () => {
      const result = filterPageData(['Italian'], ['Pasta'], mockCards);
      expect(result).toEqual([{id: '',
        title: '',
        imageSrc: '', area: 'Italian', category: 'Pasta' }]);
    });

    it('should filter area only when category filters not applied', () => {
      const result = filterPageData(['Italian'],[], mockCards);
      expect(result).toEqual([{id: '',
        title: '',
        imageSrc: '', area: 'Italian', category: 'Pasta' }]);
    });

     it('should filter category only when area filters not applied', () => {
      const result = filterPageData([],['Pasta'], mockCards);
      expect(result).toEqual([{id: '',
        title: '',
        imageSrc: '', area: 'Italian', category: 'Pasta' }]);
    });

    it('should return original list when no filters applied', () => {
      const result = filterPageData([], [], mockCards);
      expect(result).toEqual(mockCards);
    });

    it('should handle empty card list', () => {
      expect(filterPageData(['Italian'], ['Pasta'], [])).toEqual([]);
    });
  });
});