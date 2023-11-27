import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'; // Import axios
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import AboutUs from "./components/AboutUs";
import UserHomePage from "./components/UserHomePage";
import './components/Design.css';
import AddBook from "./components/AddBooks";
import SearchPage from "./components/SearchPage";
import UpdateProductByTitle from "./components/UpdateProductByTitle";
import DeleteProductByTitle from "./components/DeleteProductByTitle";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchBooks();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/signout');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

   const fetchBooks = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setBooks(data);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};
  
  
  
    const addBook = async (newBook) => {
      // Send the new book to the server
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
  
      // If successful, fetch the updated list of books
      if (response.ok) {
        fetchBooks();
      }
    };

  
    const deleteBookByTitle = async (title) => {
      // Send the title to the server for deletion
      const response = await fetch(`http://localhost:3000/api/products/title/${title}`, {
        method: 'DELETE',
      });
  
      // If successful, fetch the updated list of books
      if (response.ok) {
        fetchBooks();
      }
    };
  
    const findOneByTitle = async (title) => {
      // Send the title to the server for finding by title
      const response = await fetch(`http://localhost:3000/api/products/title/${title}`);
      const data = await response.json();
      setSearchResult(data); // Set the search result for rendering
    };
  
    const updateBookByTitle = async (title, updatedData) => {
      // Send the title and updated data to the server for updating
      const response = await fetch(`http://localhost:3000/api/products/title/${title}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      // If successful, fetch the updated list of books
      if (response.ok) {
        fetchBooks();
      }
    };

    


  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/userhomepage" element={isAuthenticated ? <UserHomePage /> : <HomePage />} />
        <Route path="/add-book" element={<AddBook onAddBook={addBook} />} />
        <Route path="/search" element={<SearchPage onSearch={findOneByTitle} />} />
        <Route path="/update-product-by-title" element={<UpdateProductByTitle onUpdateProduct={updateBookByTitle} />} />
        <Route path="/delete-product-by-title" element={<DeleteProductByTitle onDeleteProduct={deleteBookByTitle} />} />
        {/* Add other routes here */}
      </Routes>

        {/* Display book information only when there's a search result */}
        {searchResult && (
        <div>
          <h3>Book Information</h3>
          <ul>
            <li><strong>Title:</strong> {searchResult.title}</li>
            <li><strong>Author:</strong> {searchResult.author}</li>
            <li><strong>Year:</strong> {searchResult.year}</li>
            <li><strong>Genre:</strong> {searchResult.genre}</li>
            <li><strong>Length:</strong> {searchResult.length}</li>
          </ul>
        </div>
      )}
    </Router>
  );
}

export default App;

