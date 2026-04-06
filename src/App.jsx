import { BrowserRouter, Route, Routes } from "react-router";
import ChatPage from "./components/ChatPage";
import HomePage from "./components/HomePage"
const App = () => {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/ChatPage" element={<ChatPage/>}/>
    <Route path="/" element={<HomePage/>}/>
   </Routes>
   </BrowserRouter>
    </>
    )
}
export default App;