import { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = false;

  return (
    <Fragment>
      {
        isAuth ? (
          <Navigate to='/' />
        ): (
          <Fragment>
            <section className="flex flex-1 justify-center items-center flex-col py-10">
              <Outlet />
            </section>

            <img 
              src="/assets/images/side-img.svg" 
              alt=""
              className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default AuthLayout