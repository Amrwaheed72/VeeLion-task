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

---

## 2. Task Dashboard Module

### Performance

#### Issue 1: The API Request Cycle (over-fetching) & Bypassing cache

- **What is wrong**: it's the same problem that existed in the `Activity Feed` Module, long way for fetching and so many functions and cycles that i got confused what is going on here!. In `useTasks` handling errors and loading still manually, throwing error is wrong and can cause a bad UX behavior, spaghetti code mixing the business logic with presentational login with server logic, some unnecessary functions like `getErrorMessage` & `requestJson`

- **Why it matters**: This is complex, redundant and unnecessary code, bad DX, and the cycle can cause bad performance as we discussed in the first module

- **Suggested improvements**: Remove all the unnecessary `useEffect`, `useState` and the API route handler, Migrate the API requests into server actions (Next.js app router preferred way), use caching with revalidating based on the mutation

#### Issue 2: Performance Bug (Date Parsing in a Loop)

- **What is wrong**: inside `TaskItem.tsx` component, the code uses `new Date()` inside the `.map()` loop.

- **Why it matters**: if the user has hundreds of tasks, this creates hundreds of Dates objects with each render, which can be heavy on the browser on every single render, which also causes high `Total Blocking Time` (TBT).

- **Suggested improvement**: extract the data formatting logic into the `utils` file

---

### UX Issues

#### Issue 3: Silent Error Swallowing & Manual Loading States

- **What is wrong**: As i said in the previous issue, handling error state and loading state still manual, using state for each of them makes it overuse, and force the component to be `client component`, no good use of streaming `Suspense`

- **Why it matters**: showing the user exactly what is happening on the screen make the UX much better, visualizing the loading state in a skeleton that looks like the component makes the user feels this website is fast. In case of error, showing him a nice, friendly looking error message on the screen will make the user realize the problem which make the UX much better too

- **Suggested improvement**: using `Suspense` for loading and wrapping the server component that fetches the data with this `Suspense`, use the Result pattern instead of throwing error will enables me to use the `ErrorFallback` component in case of any error without breaking the UI.

#### Issue 4: Missing Optimistic Updates

- **What is wrong**: when the user clicks "Mark as completed", the UI triggers "Saving.." state and waits for the server response before actually changing the visual state of the task.

- **Why it matters**: in a Production App, this can feels heavy and outdated, most modern web apps now use the `Optimistic UI Update` technique because this makes the app feels much faster and improves the UX.

- **Suggested improvement**: implement `Optimistic UI Update` using `useOptimistic` hook or using immediate local state update to update the UI while syncing with the server in the background.

---

### 💎 Code Quality

#### Issue 5: Poor Separation of Concerns (Inline Styles)

- **What is wrong:** The code relies heavily on inline styles scattered across the Page's components.

- **Why it matters:** Mixing business logic, JSX, and styling makes the components extremely difficult to read. It also completely prevents the use of media queries for responsive design.

- **Suggested improvement:** Move all inline styles to centralized CSS files (like `globals.css` or CSS modules).

---

## 3. Reports Page Module

### What i did

- Applied all the best practices and performance optimization (using server actions)
- Applied separation of concerns, separated the logic from the styling
- Implemented loading state using `Suspense` with a `Skeleton UI` that matches the page during loading, also implemented the error state and empty state using the reusable component `ErrorFallback` & `Empty`
- Applied best practices in Next.js by make the components as server components
- Implemented a visual Bar, that indicated the percentage of the completed tasks

## Global Fixes

**Please note that i did't install any external packages and stick to the minimum provided packages, for better styling i would choose `TailwindCSS`, for better UX i would install `Lucide` for icons and `sonner` for toasts, also i used Native Debounce instead of installing external packages (which is better), you did't say i can install external packages so i sticked to it**

1. Refactored all the components related to the two pages into `features` folder, containing all the components and business login related to each page, and the shared code `utilities` or `components` were implemented globally outside the `features` folder, this helps the separation between route folders (pure server components) and the components, achieving the separation of concerns
2. removed the `backendApi.ts` file and the api folder `API route handler` no longer useful, as they are refactored into server actions
3. removed unnecessary types
4. all server actions are mostly like each other, so why not making a reusable utility server action and reuse it across multiple actions, so i made a reusable `server-action-wrapper` inside `utils` folder to reuse it across multiple server action across the whole app
5. for a better UX i would like to use toasts for notifications, but let's stick to the main task requirements and leave the message to be logged in the console or displayed as a simple message on the ui
6. global utilities like date formatting were moved to `utils` folder to make it reusable and use it across the whole app
7. global generic types for components separated from the `api.ts` types file, to make the code cleaner and achieve the separation of concerns
8. built the `ErrorFallback` and `Empty` component for handling empty sstates and error states with nice looking ui to use them across the whole app
9. implemented a separate css file for each module, and global file for shared styles
10. enhancing the css styling
11. i used os icons because i am not allowed to install external packages or use svg icons, so i sticked to the main goal of the task
