# Recipe Finder - Requirements

## API Documentation

[TheMealDB API Documentation](https://www.themealdb.com/api.php)

## Live Example

A reference implementation is available to demonstrate the expected functionality and user experience:

- **URL:** <https://recipe-finder-technical-assessment.netlify.app/>
- **Password:** `maps-test-2025!`

Review this example to understand:

- Expected UI/UX design and layout
- Search and filtering behaviour
- Progressive enhancement implementation
- Responsive design patterns
- Overall application flow and user interactions

Use this as a guide for your implementation, while applying your own technical approach and code organisation.

## Required Features

### 1. Search Functionality

- Implement a search form that allows users to search meals by name
- The search must work without JavaScript using HTML forms and server-side handling
- Support progressive enhancement: basic search works without JS, enhanced with client-side features if JS is available
- Handle empty search states appropriately
- Display search results from the server

### 2. Filtering System

Implement filters for the following categories:

- Category (e.g., Beef, Chicken, Dessert, Vegetarian)
- Area/Cuisine (e.g., Italian, Mexican, Chinese, American)

Requirements:

- Filters must work without JavaScript using HTML forms and server-side handling
- Users should be able to select multiple values within each filter type (e.g., multiple areas like "Italian" and "Mexican", or multiple categories)
- **Filter Logic:**
  - When multiple values are selected **within the same filter type**, use OR logic (union) - e.g., selecting "Italian" and "Mexican" areas shows meals from either cuisine
  - When values are selected **across different filter types**, use AND logic (intersection) - e.g., selecting "Chicken" category AND "Italian" area shows only Italian chicken dishes
  - Example: Selecting Category=[Beef, Chicken] AND Area=[Italian] returns meals that are (Beef OR Chicken) AND Italian
- Support progressive enhancement with form submissions
- Show appropriate UI feedback when filtering

### 3. Meal List View

- Display meals in a responsive grid layout
- Each meal card should show:
  - Meal thumbnail image
  - Meal name
  - Clickable to navigate to detail page
- Implement proper loading states
- Handle empty results gracefully

### 4. Pagination

Implement pagination when there are more than 12 results:

- Display 12 meals per page
- Show pagination controls (previous, next, page numbers)
- Pagination must work without JavaScript using URL query parameters
- Support progressive enhancement: basic pagination works without JS, enhanced with client-side navigation if available
- Preserve search and filter state when navigating between pages
- Show current page indicator and total page count
- Handle edge cases (first page, last page, invalid page numbers)

### 5. Recipe Detail Page

Create a dedicated page (`/meals/[id]`) that displays:

- Full-size meal image
- Meal name, category, and area
- Complete ingredient list with measurements
- Step-by-step cooking instructions
- Additional metadata (tags, YouTube video link if available)
- Back navigation to main page

### 6. API Caching

Implement caching for API requests to improve performance and reduce unnecessary API calls:

- Cache API responses appropriately
- Consider cache invalidation strategies
- You may use any caching approach: HTTP caching, in-memory caching, Next.js caching features, etc.
- Document your caching strategy and trade-offs

### 7. Error Handling

- Network error handling with user-friendly messages
- Failed image loading fallbacks
- API rate limiting considerations
- Invalid meal ID handling on detail page

### 8. Testing

Write tests for:

- Components
- API service functions
- Caching implementation

Test coverage should demonstrate understanding of:

- Component rendering
- Form functionality
- Server-side rendering
- Async operations
- Edge cases

## Technical Requirements

### Must Have

- TypeScript with proper type definitions
- Server-side rendering using Next.js getServerSideProps
- Progressive enhancement - functionality works without JavaScript
- HTML forms for search and filtering (works without JS)
- API caching implementation (any approach)
- Clean code organisation and file structure
- Responsive design
- Error handling
- Test coverage (Jest + React Testing Library)

### Bonus Points

- Accessibility considerations (ARIA labels, keyboard navigation, semantic HTML)
- Client-side enhancements that gracefully degrade
- Code comments explaining complex logic
- Clean, intuitive UI/UX
