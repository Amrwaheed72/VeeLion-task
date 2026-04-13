# VeeLion Frontend assessment - Code Review

---

## 1. Activity Feed Module

### Performance

#### Issue 1: The API Request Cycle (over-fetching) & Bypassing cache

- **What is wrong**: The component uses a `useEffect` hook to call the Next.js API Route Handler `api/activity/route.ts` which then uses fetch function to call the backend. Additionally `backendApi.ts` explicitly uses `cache: "no-store"` for GET requests.

- **Why it matters**: This browser-to-proxy-to-backend cycle adds unnecessary network latency, negatively impacting the core web vitals (TTFB, FCB, LCP). Bypassing the Next.js cache system puts a big load on the backend server for static or shared data.

- **Suggested improvements**: Remove all the useEffect and Next.js API Route Handlers, Transform all the api requests into **Server Actions**, this enables me to use the Next.js cache system with revalidating after each mutation using revalidateTag() and revalidatePath. Migrate the page to async **Server Component**. Fetch the data directly from Express server to Next.js (server-to-server).

- **Why this solution:** It establishes a direct Backend-to-Backend connection, eliminating the redundant API proxy layer. This reduces the JS bundle sent to the client (improving performance), enhances security by keeping requests on the server, and allows Next.js to cache the data, meaning users will be served instantly without hitting the backend again.

#### Issue 2: Performance Bug (memory leak)

- **What is wrong**: A `setInterval` continuously updates a `tick` state every 1.4 seconds. this tick force the `forcedList` to map over the array and re-create the object reference in the memory.

- **Why it matters**: itt forces continuous and unnecessary re-renders of the DOM even when the user is idle, destroying performance and causing memory leaks.

- **Suggested improvement**: remove the `setInterval`, the `tich` state, and the `forcedList`. the filtered data should be computed directly during the render phase.

- **Why this solution**: it eliminates the root cause of memory leaks and performance bug, because this is redundant code and do nothing new (useless)

#### Issue 3: Missing Debounce on Search Input

- **What is wrong**: The `query` state updates and triggers array filtering on every single keystroke.

- **Why it matters**: in a production app with larger dataset, filtering on every keystroke causes main thread blocking, leading to UI lag and poor typing performance, and if the filtering occurs on the server, then every keystroke means a new request on the backend server which will lead to a disaster.

- **Suggested improvement**: implementing a debounce mechanism, waiting 400ms before performing the operation, to ensure a smooth typing and rendering (or only 1 request on the backend).

- **Why this solution**: it reduces the number of re-renders and filter computations. this prevents the UI from freezing during rapid typing, providing a much smoother UX that scales well with larger data.

---

### React Best Practices

#### Issue 4: Derived State & Redundant `useState`

- **What is wrong**: after fetching data, it's assigned to 3 different states (`allActivity`, `shownActivity`, `forcedList`). the filtered data is stored in a derived state variable instead of being calculated on the fly.

- **Why it matters**: storing derived data in a state is a react anti-pattern. it causes unnecessary re-renders leads to bugs and makes the code harder to read.

- **Suggested improvement**: i can keep only one state for the search input `query` and calculate the filtered data dynamically as a variable before the `return` statement.

---

### UX Issues

#### Issue 5: Silent Error Swallowing

- **What is wrong**: in the `useEffect` fetch block, if error occurs, the component simply sets all the state arrays to empty arrays`[]` in the `catch` part without displaying any error message to the user.

- **Why it matters**: the user will seee an empty activity list and assume there is no activity, without realizing that the server request has failed, this can be so misleading.

- **Suggested improvement**: implement a `ErrorFallback` component with Result Pattern (or use Next.js `error.tsx` file) (or even use error state) and display a clear error message to the user when the API request fails.

#### Issue 6: Manual Loading States

- **What is wrong**: There is no skeleton or spinner provided during the initial data load.

- **Why it matters**: Users receive no visual feedback that data is loading, which makes the app feel broken or unresponsive on slower networks.

- **Suggested improvement**: using Next.js built in `loading.tsx` file or `Suspense` with server fetching to show a skeleton UI while server component is fetching the data.

---

### Maintainability

#### Issue 7: Redundant Utilities & Functions

- **What is wrong**: the code contains exact duplicate functions for formatting `formatTimeA` `formatTimeB` and filtering `applyFilterA` and `applyFilterB`.

- **Why it matters**: this violates the DRY principle (Don't repeat yourself), it make the component larger, cause confusion, and make the future Maintenance is harder.

- **Suggested improvement**: i can delete the duplicate functions, and use a single well-name utility function for formatting, and handling the filtering logic cleanly inline.

---

### Code Quality

#### Issue 8: Poor Separation of Concerns (Inline Styles)

- **What is wrong**: using the inline styles mixed with JSX despite having a `globals.css` file.

- **Why it matters**: mixing logic with markup and styling makes the components extremely hard to read and can cause a future hard maintainability, inline styles also prevent the use of media queries.

- **Suggested improvement**: move all the inline styles to `globals.css` file (`or using Tailwind which i prefer`) to Keep the JSX clean.

#### Issue 9: Missing Accessibility (a11y)

- **What is wrong**: the serach input element lack an associated label element or `aria-label` attribute.

- **Why it matters**: users rely on screen readers will not be able to understand the purpose of the input field, violating basic web accessibility standards for a production app.

- **Suggested improvement**: add a hidden `label` element or an `aria-label` attribute.
