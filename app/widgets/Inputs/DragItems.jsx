import React from "react";
import { List, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";

import { useDrag } from "react-dnd";
import ShortTextIcon from '@mui/icons-material/ShortText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TableChartIcon from '@mui/icons-material/TableChart';

const TextResponse = () => {
   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'text response'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <ShortTextIcon />
            </ListItemIcon>
            <ListItemText primary="Text Response" />
         </ListItemButton>
      </List>
   )
}

const SingleSelect = () => {
   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'single select'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Single Select" />
         </ListItemButton>
      </List>
   )
}

const MultiSelect = () => {
   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'multi select'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Multi Select" />
         </ListItemButton>
      </List>
   )
}

const DateTime = () => {
   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'datetime'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Date & time" />
         </ListItemButton>
      </List>
   )
}

const CheckList = () => {
   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'checklist'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary="Checklist" />
         </ListItemButton>
      </List>
   )
}

const Table = () => {
   const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'table'
   }))

   return (
      <List component="div" disablePadding ref={dragRef}>
         <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
               <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Table" />
         </ListItemButton>
      </List>
   )
}

export { TextResponse, SingleSelect, MultiSelect, DateTime, CheckList, Table }