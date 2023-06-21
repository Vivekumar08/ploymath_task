import React from 'react'

const Layout = ({children, className=""}) => {
  return (
    <div className={`w-full h-full inline-block p-32 lg:p-16 md:p-12 sm:p-18  bg-light ${className}`}>
        {children}
    </div>
  )
}

export default Layout