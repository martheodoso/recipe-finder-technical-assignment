import { CardDetails } from "../types";
import { getAreas, getCuisineList, filterTags, convertToDefaultFilterData, filterPageData } from "./pageFilter";

describe("pageFilter utilities", () => {
  describe("getAreas", () => {
    it("returns list of strArea values when meals present", () => {
      const input = { meals: [{ strArea: "Italian" }, { strArea: "Mexican" }]};
      expect(getAreas(input)).toEqual(["Italian", "Mexican"]);
    });

    it("returns undefined when input is undefined", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(getAreas(undefined as any)).toBeUndefined();
    });

    it("returns [] when meals is an empty array", () => {
      
      const input = { meals: [] };
      expect(getAreas(input)).toEqual([]);
    });
  });

  describe("getCuisineList", () => {
    it("returns list of strCategory values when meals present", () => {
      const input = { meals: [{ strCategory: "Seafood" }, { strCategory: "Vegan" }] };
      expect(getCuisineList(input)).toEqual(["Seafood", "Vegan"]);
    });

    it("returns [] when meals is an empty array", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const input = { meals: [] } as any;
      expect(getCuisineList(input)).toEqual([]);
    });
  });

  describe("filterTags", () => {
    it("removes the selected tag from the list", () => {
      const all = ["one", "two", "three"];
      expect(filterTags(all, "two")).toEqual(["one", "three"]);
    });

    it("returns the original list if tag not present", () => {
      const all = ["one", "two"];
      expect(filterTags(all, "three")).toEqual(["one", "two"]);
    });

    it("returns empty array when input array is empty", () => {
      expect(filterTags([], "any")).toEqual([]);
    });
  });

  describe("convertToDefaultFilterData", () => {
    it("returns [] when filters is undefined", () => {
      expect(convertToDefaultFilterData(undefined, null)).toEqual([]);
    });

    it("maps filters to objects with checked flag based on checkedFilters", () => {
      const filters = ["a", "b", "c"];
      const checked = ["b"];
      expect(convertToDefaultFilterData(filters, checked)).toEqual([
        { value: "a", checked: false },
        { value: "b", checked: true },
        { value: "c", checked: false },
      ]);
    });

    it("handles null checkedFilters as none checked", () => {
      const filters = ["x"];
      expect(convertToDefaultFilterData(filters, null)).toEqual([{ value: "x", checked: false }]);
    });
  });

  describe("filterPageData", () => {
    const cards = [
      { id: 1, area: "Italian", category: "Main" },
      { id: 2, area: "French", category: "Dessert" },
      { id: 3, /*no area */ category: "Italian" },
    ] as unknown as CardDetails[];

    it("returns original list when filters array is empty", () => {
      expect(filterPageData([], cards)).toEqual(cards);
    });

    it("returns original list when card list is empty", () => {
      expect(filterPageData(["Italian"], [])).toEqual([]);
    });

    it("filters cards by matching area or category", () => {
      const result = filterPageData(["Italian"], cards);
      // should include card 1 (area) and card 3 (category)
      expect(result).toEqual([
        { id: 1, area: "Italian", category: "Main" },
        { id: 3, category: "Italian" },
      ]);
    });

    it("returns empty array when no cards match the filters", () => {
      const result = filterPageData(["Japanese"], cards);
      expect(result).toEqual([]);
    });
  });
});