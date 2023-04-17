import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavermapsProvider } from "react-naver-maps";
import './App.css';
import Router from "./shared/Router";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      retry: false,
      refetchOnWindowFocus : false,
    }
  }  
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider
          ncpClientId="l4pkkagxjm"
        >
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Router/>
      </NavermapsProvider>
    </QueryClientProvider>
  );
}

export default App;
