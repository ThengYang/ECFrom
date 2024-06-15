"user client"

import React from "react";
import { useDrag } from "react-dnd";
import { Box, IconButton, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PanToolIcon from '@mui/icons-material/PanTool';
import DeleteIcon from '@mui/icons-material/Delete';
import { getEmptyImage } from 'react-dnd-html5-backend'

const WidgetController = (props) => {

   const {
      onAdd = () => void 0,
      onDrag = () => void 0,
      onDragStart = () => void 0,
      onDragEnd = () => void 0,
      onDelete = () => void 0,
      visible = false,
      id = null,
      parentId = null,
   } = props

   const [collected, drag, dragPreview] = useDrag(() => ({
      item: { id, parentId },
      type: 'widget-item',
      collect: (monitor) => ({
         isDragging: monitor.isDragging()
      }),
      options: {
         dropEffect: 'move'
      },
      end: onDragEnd
   }))

   React.useEffect(() => {
      dragPreview(getEmptyImage(), { captureDraggingState: true })
   })

   const handleAddClick = () => {
      onAdd(id)
   }

   const handleDeleteClick = () => {
      onDelete(id);
   }

   return (
      <Box sx={{ position: 'relative', display: visible ? '' : 'none' }}>
         <Grid
            container
            spacing={0}
            sx={{
               position: 'absolute',
               width: '110px',
               height: '30px',
               backgroundColor: '#90caf9',
               top: -30,
               left: 0,
               right: 0,
               margin: 'auto',
               borderRadius: '10px 10px 2px 2px',
            }}
         >
            <Grid item xs={4}>
               <IconButton size="small" sx={{ borderRadius: 0 }} color="success" onClick={handleAddClick}>
                  <AddIcon sx={{ fontSize: '23px' }} />
               </IconButton>
            </Grid>
            <Grid item xs={4}>
               <IconButton size="small" sx={{ borderRadius: 0 }}
                  ref={drag}
                  onDrag={onDrag}
                  onDragStart={onDragStart}
               >
                  <PanToolIcon sx={{ fontSize: '20px' }} />
               </IconButton>
            </Grid>
            <Grid item xs={4}>
               <IconButton size="small" sx={{ borderRadius: 0 }} color="error" onClick={handleDeleteClick}>
                  <DeleteIcon sx={{ fontSize: '22px' }} />
               </IconButton>
            </Grid>
         </Grid>
      </Box>
   )
}

export default WidgetController