import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LinkAcountSample from './LinkAcountSample';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/link-account' element={<LinkAcountSample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
