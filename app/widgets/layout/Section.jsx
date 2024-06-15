import React from "react";
import { useDrop } from 'react-dnd'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Box, IconButton, Typography } from "@mui/material";

import { generatableWidgets } from "@/app/constants/DropAcceptable";

const Section = (prop) => {

   const { id = null, onAdd = () => void 0 } = prop
   const [boxBorderColor, setBoxBorderColor] = React.useState('gray')

   const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
      () => ({
         accept: generatableWidgets,
         drop(item, monitor) {
            onAdd(id, monitor.getItemType())
            return undefined
         },
         collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggingColor: monitor.getItemType()
         }),

      }),
      [onAdd],
   )

   const handleClick = (event) => {
      onAdd(id)
   }

   return (
      <Box
         sx={{
            textAlign: 'center',
            padding: '20px',
            border: '1.5px dashed',
            margin: '1em',
            borderColor: boxBorderColor
         }}
         ref={drop}
         onDragOver={() => setBoxBorderColor('green')}
         onDrop={() => setBoxBorderColor('gray')}
         onDragLeave={() => setBoxBorderColor('gray')}
      >
         <IconButton size='small' onClick={handleClick} sx={{ color: boxBorderColor }}>
            <AddCircleRoundedIcon style={{ fontSize: 30 }} />
         </IconButton>
         <Typography style={{ fontSize: '14px', fontStyle: 'italic' }}>
            Drag widget here
         </Typography>
      </Box>
   )
}

export default Section