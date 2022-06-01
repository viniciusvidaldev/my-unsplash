import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { Home } from "./pages/Home";
import GlobalStyles from "./styles/global";
import { lightTheme } from "./styles/theme/light";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Toaster />

      <Home />
    </ThemeProvider>
  );
}

export default App;
