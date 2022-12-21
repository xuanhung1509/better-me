import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard, Landing, NotFound, SignIn, SignUp } from '@/pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
