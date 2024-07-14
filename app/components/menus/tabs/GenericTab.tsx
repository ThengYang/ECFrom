import { useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";

interface GenericTabProps {
   tabs: Array<string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined>
   activeTab?: number,
   variant?: 'underlined' | 'filled',
   height?: number,
   width?: number,
   color?: string,
   activeColor?: string,
   indicatorColor?: string,
   onChange?: (value: number) => void,
}

const GenericTab = (props: GenericTabProps) => {
   const {
      tabs,
      activeTab = 0,
      variant = 'underlined',
      height = 30,
      width = 30,
      indicatorColor = 'default',
      color = 'default',
      activeColor = '#000000',
      onChange = () => void 0,
   } = props

   const [value, setValue] = useState(activeTab ? activeTab : 0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
      onChange(newValue)
   };

   return (
      <Box sx={{ p: 1, border: '1px solid black' }}>
         <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Generic Tabs"
            TabIndicatorProps={{
               style: {
                  backgroundColor: indicatorColor,
                  height: variant === 'filled' ? '100%' : '3px',
                  opacity: variant === 'filled' ? 0.2 : 1.0,
               }
            }}
            sx={{ minHeight: height, height: height, padding: 0, margin: 0 }}
         >
            {tabs.map((tab, idx) => typeof tab === "string" ?
               <Tab
                  label={tab}
                  sx={{
                     textTransform: 'none',
                     color: color,
                     minHeight: height,
                     height: height,
                     minWidth: width,
                     width: width,
                     '&.Mui-selected': { color: activeColor },
                     '&:hover': { color: activeColor }
                  }}
                  disableRipple
                  key={idx}

               /> :
               <Tab
                  icon={tab}
                  sx={{
                     textTransform: 'none',
                     color: color,
                     minHeight: height,
                     height: height,
                     minWidth: width,
                     width: width,
                     '&.Mui-selected': { color: activeColor },
                     '&:hover': { color: activeColor }
                  }}
                  disableRipple
                  key={idx}
               />
            )}
         </Tabs>
      </Box>
   )
}

export default GenericTab