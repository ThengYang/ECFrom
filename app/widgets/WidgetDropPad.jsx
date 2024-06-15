import React from "react";

import { useDrop } from 'react-dnd'
import { Box } from "@mui/material";
import AnchorRoundedIcon from '@mui/icons-material/AnchorRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

import { dragableWidgets } from "../constants/DropAcceptable";

const WidgetDrogPad = ({ children, onDrop, widgets, targetId, parent, variant = 'stack' }) => {

   const [showBox, setShowBox] = React.useState('above')
   const [isOverParent, setIsOverParent] = React.useState(false)

   const [{ isOver }, drop] = useDrop(
      () => ({
         accept: dragableWidgets,
         drop(item, monitor) {
            onDrop(item.id, targetId)
            return undefined
         },

         collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
         }),

         hover: (item, monitor) => {

            const sourceIndex = widgets.findIndex(widget => widget.id === item.id)
            const targetIndex = widgets.findIndex(widget => widget.id === targetId)

            if (parent === item.parentId) {

               if (sourceIndex < targetIndex && (variant !== 'swap')) {
                  setShowBox('below')
               }
               else {
                  setShowBox('above')
               }
               setIsOverParent(true)
            }

            else {
               setIsOverParent(false)
            }
         }

      }), [widgets],
   )

   return (

      <Box
         ref={drop}
      >
         <Box
            sx={{
               backgroundColor: '#86abca',
               width: '100%',
               textAlign: 'center',
               display: isOver && isOverParent && showBox === 'above' ? '' : 'none',
               padding: '1em',
               borderRadius: '5px',
               cursor: 'pointer',
               marginTop: variant === 'swap' ? '1em' : 0,

            }}
         >
            {variant === 'stack' ? <AnchorRoundedIcon /> : <SwapHorizRoundedIcon />}
         </Box>
         <Box sx={{ display: isOver && isOverParent && variant === 'swap' ? 'none' : '' }}>
            {children}
         </Box>
         <Box
            sx={{
               backgroundColor: '#86abca',
               width: '100%',
               textAlign: 'center',
               display: isOver && isOverParent && showBox === 'below' ? '' : 'none',
               padding: '1em',
               borderRadius: '5px',
               cursor: 'pointer'
            }}
         >
            {variant === 'stack' ? <AnchorRoundedIcon /> : <SwapHorizRoundedIcon />}
         </Box>
      </Box>

   )
}

export default WidgetDrogPad
