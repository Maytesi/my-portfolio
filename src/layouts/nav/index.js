import React, { useState } from 'react'
import { Container, Box, Typography, Tab, Tabs, SvgIcon, useMediaQuery } from '@mui/material'
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Folder as FolderIcon,
  Timeline as TimeLineIcon,
  ContactMail as ContactMailIcon
} from '@mui/icons-material'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id             : `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const menu = [
  { title: 'Home', icon: HomeIcon },
  { title: 'About me', icon: PersonIcon },
  { title: 'Projects', icon: FolderIcon },
  { title: 'Experience', icon: TimeLineIcon },
  { title: 'Contact', icon: ContactMailIcon }
]

const NavLayout =  ({ children }) => {
  const [ value, setValue ] = useState(0)
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const _handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Container fixed style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Box
        sx={{ flexGrow: 1, display: 'flex', ...isDesktop ? { height: '100%' } : { width: '100%', flexDirection: 'column' } }}>
        <Tabs
          orientation={isDesktop ? 'vertical' : 'horizontal'}
          variant='scrollable'
          value={value}
          onChange={_handleChange}
          sx={{ ...isDesktop ? { borderRight: 1 } : { borderBottom: 1 }, borderColor: 'divider' }}>
          {
            menu.map(({ title, icon: Icon },index) => (
              <Tab
                key={`${title}-${index}`}
                label={
                  <Box sx={{ display: 'flex', ...isDesktop ? { gap: 2 } : { flexDirection: 'column', alignItems: 'center', gap: 1 } }}>
                    <SvgIcon component={Icon} />
                    <Typography>{title}</Typography>
                  </Box>
                }
                index={index}
                {...a11yProps(0)} />
            ))
          }
        </Tabs>
        {children.map((child, index) => (
          <TabPanel value={value} index={index} key={`nodo-${index}`}>
            {child}
          </TabPanel>
        ))}
      </Box>
    </Container>
  )
}

export default NavLayout
