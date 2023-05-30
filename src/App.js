import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import NavLayout from './layouts/nav'
import ThemeContext from './context/ThemeContext'

const App = () => {
  return (
    <ThemeContext>
      <CssBaseline />
      <NavLayout>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </NavLayout>
    </ThemeContext>
  )
}

export default App
