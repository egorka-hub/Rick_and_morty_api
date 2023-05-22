import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from "./components/Container";
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Container >
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}
export default App;
