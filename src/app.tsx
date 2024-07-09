import { Provider } from "react-redux";
import AppRouter from "./app-router";
import { ThemeProvider } from "./providers/theme-provider";
import { store } from "./store/store";
import { storage } from "./lib/localstorage";

const App = () => {
  return (
      <Provider store={store}>
        <ThemeProvider defaultTheme='system' storageKey={storage.theme}>
          <AppRouter />
        </ThemeProvider>
      </Provider>
  )
}

export default App;