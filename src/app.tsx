import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Provider } from "react-redux";
import AppRouter from "./app-router";
import { QueryProvider } from "./providers/query-provider";
import { ThemeProvider } from "./providers/theme-provider";
// import { store } from "./store/store";

const App = () => {
  return (
    <QueryProvider>
      {/* <Provider store={store}> */}
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <AppRouter />
          <ReactQueryDevtools />
        </ThemeProvider>
      {/* </Provider> */}
    </QueryProvider>
  )
}

export default App;