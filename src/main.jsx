import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './components/Layout/Layout.jsx'
import Countries from './components/Countries/Countries.jsx'
import CountryDetails from './components/Details/CountryDetails.jsx'

const pages = createBrowserRouter([
  {
    path: '/', element: <Layout/>, children: [
      { index: true, element: <Countries/> },
      { path: '/country/:name', element: <CountryDetails/>},
      { path: '*', element: <h1 className='text-center mt-40 text-6xl'>Page not found</h1> }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={pages}></RouterProvider>
)
