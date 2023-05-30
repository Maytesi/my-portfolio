import React, { useMemo, memo, useState } from 'react'
import { useMediaQuery,ThemeProvider, Fab, Popover } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import {
  DarkMode as DarkModeIcon,
  Brightness7 as Brightness7Icon,
  Settings as SettingsIcon,
  Circle as CircleIcon
} from '@mui/icons-material'

import { PRIMARY_GREEN, PRIMARY_ORANGE, PRIMARY_PURPLE } from '../utils/constants'

const primaryColors = [
  {
    key  : 'primary_green',
    value: PRIMARY_GREEN
  },
  {
    key  : 'primary_orange',
    value: PRIMARY_ORANGE
  },
  {
    key  : 'primary_purple',
    value: PRIMARY_PURPLE
  }
]

const ColorSettings = ({ onChangePalette = () => {} }) => {
  const [ anchorEl, setAnchorEl ] = useState(null)
  const id = anchorEl ? 'simple-popover' : undefined

  return (
    <>
      <Fab
        color='secondary'
        aria-describedby={id}
        sx={{
          position: 'absolute',
          bottom  : 16 * 5,
          left    : 16
        }}
        onClick={(e) => {setAnchorEl(e.currentTarget)}}>
        <SettingsIcon color='primary'  />
      </Fab>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {setAnchorEl(null)}}
        anchorOrigin={{
          vertical  : 'top',
          horizontal: 'right'

        }}>
        {
          primaryColors.map(color => (
            <CircleIcon
              sx={{ fontSize: 40, color: color?.value?.main, cursor: 'pointer' }}
              onClick={() => {onChangePalette(color.value)}}
              key={color.key} />)
          )
        }
      </Popover>
    </>
  )
}

const ThemeContext = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [ isDarkMode, setDarkMode ] = useState(() => prefersDarkMode)
  const [ colorSelected, setColorSelected ] = useState(null)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: colorSelected || PRIMARY_GREEN,
          mode   : isDarkMode ? 'dark' : 'light'
        }
      }),
    [ isDarkMode, colorSelected ]
  )

  const _handleChangeMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorSettings onChangePalette={setColorSelected} />
      <Fab
        onClick={_handleChangeMode}
        sx={{
          position: 'absolute',
          bottom  : 16,
          left    : 16
        }
        }>
        {
          isDarkMode ? (
            <Brightness7Icon color='primary' />
          ) : (
            <DarkModeIcon color='primary' />
          )
        }
      </Fab>
      {children}
    </ThemeProvider>
  )
}

export default memo(ThemeContext)
