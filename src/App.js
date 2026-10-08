import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import "./App.css";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/books" element={<Books/>}/> 
        <Route path="/books/:id" element={<BookDetails/>}/> 
        <Route path="/cart" element={<Cart/>}/> 
        <Route path="/categories" element={<Categories/>}/> 
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
