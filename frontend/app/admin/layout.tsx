import React from 'react'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <header>
        {children}
    </header>
  )
}

export default layout
