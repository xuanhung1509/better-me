import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, NotFound, SignIn, SignUp } from '@/pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
export default App;
