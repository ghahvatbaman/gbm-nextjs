import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraUIThemeProvider } from "../styles/theme";
import { Layout } from "../modules/layout/layout";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraUIThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraUIThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
