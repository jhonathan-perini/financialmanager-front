import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'


import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient} >
          <App/>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>
)
