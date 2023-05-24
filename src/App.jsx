import { BrowserRouter } from "react-router-dom"
import GifProvider from "./Context/GifContext/GifContext"
import UserProvider from "./Context/UserContext/UserContext"
import Router from "./Router/Router"



function App() {

  return (
    <>
      <UserProvider>
        <GifProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </GifProvider>
      </UserProvider>
    </>
  )
}

export default App
