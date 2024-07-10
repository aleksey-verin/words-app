import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/header/header'
import Navbar from './components/navbar/navbar'
import PageSearch from './pages/search/page-search'
import PageTraining from './pages/training/page-training'
import PageWords from './pages/words/page-words'
import PageQuiz from './pages/quiz/page-quiz'
import PageLogin from './pages/login/page-login'
import { ROUTES } from './routes'
import { useAppDispatch, useAppSelector } from './hooks/store-hook'
import { selectorUserAuthSlice, userCheckAuthGetData } from './store/reducers/userAuthSlice'
import { useEffect } from 'react'
import { getDictionary } from './store/reducers/userDictionarySlice'

function AppRouter() {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(selectorUserAuthSlice)

  const getInitialData = async () => {
    await dispatch(userCheckAuthGetData())
    await dispatch(getDictionary())
  }

  useEffect(() => {
    getInitialData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          </Route>
          {!isAuth && <Route element={<PageLogin />} path={ROUTES.LOGIN} />}
          <Route element={<PageQuiz />} path={ROUTES.QUIZ} />
          <Route path='*' element={<Navigate replace to={ROUTES.SEARCH} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default AppRouter
