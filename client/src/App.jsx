import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LinkAcountSample from './LinkAcountSample';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <a href='/auth/google'>Login with google</a>
            </>
          }
        />
        <Route path='/link-account' element={<LinkAcountSample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
