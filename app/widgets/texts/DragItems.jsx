import React from "react";

import { useDrag } from "react-dnd";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';


const TitleText = () => {

   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'title text'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <TitleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Title" />
         </ListItemButton>
      </List>
   )
}

const SubtitleText = () => {

   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'subtitle text'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <SubtitlesRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Subtitle" />
         </ListItemButton>
      </List>
   )
}

export { TitleText, SubtitleText }