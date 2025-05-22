import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux';
const PublicRoutes = () => {
      const {isLoggedIn} = useSelector((state)=>state?.auth)
  return (
        !isLoggedIn ? <Outlet/> : <Navigate to = "/home"/>
  )
}

export default PublicRoutes
