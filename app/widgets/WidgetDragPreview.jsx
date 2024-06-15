"user client"

import React from "react";
import { useDragLayer } from "react-dnd";
import { Box, Typography } from "@mui/material";
import WidgetsIcon from '@mui/icons-material/Widgets';

const WidgetDragPreview = (props) => {

   const { isDragging, initialCursorOffset, currentFileOffset } = useDragLayer((monitor) => ({
      initialCursorOffset: monitor.getInitialClientOffset(),
      currentFileOffset: monitor.getSourceClientOffset(),
      isDragging: props.isDragging
   }));


   if (!isDragging) {
      return null;
   }

   return (
      <Box style={layerStyles} >
         <Box
            style={getItemStyles(
               initialCursorOffset,
               currentFileOffset
            )}
            onDragEnd={() => console.log("Done")}
         >
            <WidgetsIcon sx={{ fontSize: '40px' }} />
            <Typography>
               Widget
            </Typography>
         </Box>
      </Box>
   );
};

const layerStyles = {
   position: "fixed",
   pointerEvents: "none",
   zIndex: 100,
   left: 0,
   top: 0,
   cursor: 'pointer',
   width: '100%',
   height: '100%',

};

function snapToGrid(x, y) {
   const snappedX = Math.round(x / 32) * 32
   const snappedY = Math.round(y / 32) * 32
   return [snappedX, snappedY]
}

function getItemStyles(initialCursorOffset, currentOffset) {
   if (!initialCursorOffset || !currentOffset) {
      return { display: "none" };
   }

   let x = initialCursorOffset.x + (currentOffset.x - initialCursorOffset.x) - 50;
   let y = initialCursorOffset.y + (currentOffset.y - initialCursorOffset.y);

   //[x, y] = snapToGrid(x, y)

   const transform = `translate(${x}px, ${y}px)`;

   return {
      transform,
      WebkitTransform: transform,
      backgroundColor: '#90caf9',
      padding: '2em',
      borderRadius: '5px',
      textAlign: 'center',
      width: '150px',
      cursor: 'pointer'
   };
}

export default WidgetDragPreview