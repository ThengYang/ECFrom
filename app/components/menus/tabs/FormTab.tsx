import { ReactNode, useState, Children } from "react";

import { Box, Tabs, Tab } from "@mui/material";

interface TabPanelProps {
   children?: ReactNode;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`form-tabpanel-${index}`}
         aria-labelledby={`form-tab-${index}`}
         {...other}
      >
         {value === index && <Box sx={{ py: 2, px: 3 }}>{children}</Box>}
      </div>
   );
}

function a11yProps(index: number) {
   return {
      id: `form-tab-${index}`,
      'aria-controls': `form-tabpanel-${index}`,
   };
}


interface FormTabProps {
   tabs: Array<
      {
         label: string,
         icon: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined,
         iconPosition: 'top' | 'start' | 'bottom' | 'end'
      }
   >
   children: React.ReactNode;
   indicatorColor?: string,

   variant?: 'underline' | 'fill'
}

const FormTab = (props: FormTabProps) => {

   const {
      children,
      tabs,
      indicatorColor = 'default',
      variant = 'underline'
   } = props

   const [value, setValue] = useState(0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   return (
      <Box sx={{ width: '100%' }}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 64, backgroundColor: 'white', zIndex: 1 }}>
            <Tabs
               value={value}
               onChange={handleChange}
               variant="fullWidth"
               aria-label="Form Tabs"
               TabIndicatorProps={{
                  style: {
                     backgroundColor: indicatorColor,
                     height: variant === 'fill' ? '100%' : '3px',
                     opacity: variant === 'fill' ? 0.2 : 1.0,
                  }
               }}
            >
               {tabs.map((tab, idx) =>
                  <Tab
                     icon={tab.icon}
                     iconPosition={tab.iconPosition}
                     label={tab.label}
                     key={idx}
                     sx={{ textTransform: 'none' }}
                     {...a11yProps(0)}
                  />
               )}
            </Tabs>
         </Box>
         <Box>
            {Children.map(children, (child, idx) =>
               <TabPanel value={value} index={idx} key={idx}>
                  {child}
               </TabPanel>
            )}
         </Box>
      </Box>
   );
}

export default FormTab