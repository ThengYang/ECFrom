import React from "react";
import { Box, Typography, TextField, ThemeProvider, Avatar, IconButton, Button } from "@mui/material";
import Link from "next/link";
import BaseTheme from "../themes/BaseTheme";

import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';


const NavBar = () => {
   const [formName, setFormName] = React.useState<string>("My Form")

   const handleFormNameEmpty = () => {
      if (!formName || formName == '') {
         setFormName("My Form")
      }
   }
   return (
      <ThemeProvider theme={BaseTheme}>
         <Box
            style={{
               height: 70,
               width: '100%',
               background: '#03a9f4',
               position: 'sticky',
               top: 0,
               left: 0,
               right: 0,
               zIndex: 100,
               alignContent: 'center',
               padding: ' 0px 2em'
            }}
         >
            <TextField
               variant="standard"
               value={formName}
               onChange={(event) => setFormName(event.target.value)}
               onBlur={handleFormNameEmpty}
               InputProps={{
                  disableUnderline: true,
                  style: { fontSize: 20, fontWeight: 500 }
               }}
            />
            <Box sx={{ float: 'right' }}>

               <Button
                  variant="contained"
                  sx={{
                     marginRight: '0.5em',
                     color: '#1562c9',
                     backgroundColor: '#fff',
                     '&:hover': {
                        backgroundColor: '#dbeaf0',
                     }
                  }}
                  color="primary"
                  startIcon={<PreviewRoundedIcon />}
               >
                  Preview
               </Button>

               <Button
                  variant="contained"
                  sx={{ marginRight: '0.5em' }}
                  color="success"
                  startIcon={<PublicRoundedIcon />}
               >
                  Publish
               </Button>

               <Button
                  variant="contained"
                  sx={{
                     marginRight: '1.8em',
                     color: '#1562c9',
                     backgroundColor: '#fff',
                     '&:hover': {
                        backgroundColor: '#dbeaf0',
                     }
                  }}
                  startIcon={<GroupRoundedIcon />}
               >
                  Share
               </Button>
               <IconButton disableRipple size="small">
                  <Avatar sx={{ width: 38, height: 38 }}>T</Avatar>
               </IconButton>

            </Box>

         </Box>
      </ThemeProvider>
   )
}

export default NavBar