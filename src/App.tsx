import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Dashboard,
  Landing,
  NotFound,
  Pomodoro,
  Planner,
  SignIn,
  SignUp,
} from '@/pages';
import { PomodoroProvider } from '@/contexts/PomodoroContext';

const App = () => (
  <div
    style={{
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    <PomodoroProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/pomodoro' element={<Pomodoro />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PomodoroProvider>
  </div>
);

export default App;
