import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/header/header'
import Navbar from './components/navbar/navbar'
import PageSearch from './pages/search/page-search'
import PageTraining from './pages/training/page-training'
import PageWords from './pages/words/page-words'
import PageLogin from './pages/login/page-login'
import { ROUTES } from './routes'
import { useAppDispatch, useAppSelector } from './hooks/store-hook'
import {
  selectorUserAuthSlice,
  userCheckAuthGetData,
} from './store/reducers/userAuthSlice'
import { useEffect } from 'react'
import { getDictionary } from './store/reducers/userDictionarySlice'
import { Toaster } from './components/ui/sonner'
import PageTrainingWords from './pages/training/trainings/words/page-training-words'
import PageTrainingDefinitions from './pages/training/trainings/definitions/page-training-definitions'
import PageTrainingSprint from './pages/training/trainings/sprint/page-training-sprint'
import PageTrainingLetters from './pages/training/trainings/letters/page-training-letters'

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
  }, [])

  return (
    <div className='min-h-full bg-background font-sans antialiased relative'>
      <HashRouter>
        <Toaster />
        {isAuth ? (
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
              <Route element={<PageWords />} path={ROUTES.WORDS} />
              <Route element={<PageTraining />} path={ROUTES.TRAINING} />
            </Route>
            <Route
              element={<PageTrainingWords />}
              path={ROUTES.TRAINING_WORDS}
            />
            <Route
              element={<PageTrainingDefinitions />}
              path={ROUTES.TRAINING_DEFINITIONS}
            />
            <Route
              element={<PageTrainingSprint />}
              path={ROUTES.TRAINING_SPRINT}
            />
            <Route
              element={<PageTrainingLetters />}
              path={ROUTES.TRAINING_LETTERS}
            />
            <Route path='*' element={<Navigate replace to={ROUTES.SEARCH} />} />
          </Routes>
        ) : (
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
            </Route>
            <Route element={<PageLogin />} path={ROUTES.LOGIN} />
            <Route path='*' element={<Navigate replace to={ROUTES.SEARCH} />} />
          </Routes>
        )}
      </HashRouter>
    </div>
  )
}

export default AppRouter
