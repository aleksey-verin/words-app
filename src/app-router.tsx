import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import Header from './components/header/header'
import Navbar from './components/navbar/navbar'
import PageSearch from './pages/search/page-search'
import PageTraining from './pages/training/page-training'
import PageWords from './pages/words/page-words'
import { ROUTES } from './routes'
import PageQuiz from './pages/quiz/page-quiz'
import PageLogin from './pages/login/page-login'
// import { useAppSelector } from './hooks/store-hook'
// import { selectorUserAuthSlice } from './store/reducers/userAuthSlice'
import { useCheckAuth } from './queries/auth'

function AppRouter() {
  const { data } = useCheckAuth()
  const isAuth = data?.isAuth

  return (
    <div className='h-full bg-background font-sans antialiased relative'>
      <HashRouter>
        <Routes>
          <Route
            element={
              <>
                <Header />
                <Outlet />
                <Navbar />
              </>
            }
          >
            <Route element={<PageSearch />} path={ROUTES.SEARCH} />
            <Route element={<PageTraining />} path={ROUTES.TRAINING} />
            <Route element={<PageWords />} path={ROUTES.WORDS} />
            {!isAuth && <Route element={<PageLogin />} path={ROUTES.LOGIN} />}
          </Route>
          <Route element={<PageQuiz />} path={ROUTES.QUIZ} />
          <Route path='*' element={<Navigate replace to={ROUTES.SEARCH} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default AppRouter
