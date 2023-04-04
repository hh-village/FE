import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavermapsProvider } from "react-naver-maps";
import Router from "./shared/Router";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider
          ncpClientId="l4pkkagxjm"
        >
        <Router/>
    </NavermapsProvider>
    </QueryClientProvider>
    
  );
}

export default App;
