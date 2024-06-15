import React from "react";
import { List, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";

import { useDrag } from "react-dnd";
import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded';


const FormGrid = () => {
   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'grid'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <CalendarViewMonthRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Grid" />
         </ListItemButton>
      </List>
   )
}

export { FormGrid }