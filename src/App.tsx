import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Dashboard,
  Landing,
  NotFound,
  Pomodoro,
  SignIn,
  SignUp,
} from '@/pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/pomodoro' element={<Pomodoro />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
