import { ReactNode } from "react";

import { Box, Typography, Stack } from "@mui/material"
import { WIDGET_FILL, IS_INPUT_WIDGETS, IS_INPUTTEXT } from "@/app/constants/WigetType"

interface ViewBaseProps {
   widget: WIDGET_FILL
   children?: ReactNode
   updateWidget?: (widget: WIDGET_FILL) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
}

const ViewBase = (props: ViewBaseProps) => {
   const {
      widget,
      children,
      handleWidgetCondition,
   } = props

   const isVisible = widget.visibility?.conditional ?
      handleWidgetCondition('visibility', widget.visibility) :
      widget.visibility?.action === 'hidden' ? false : true

   return (
      <Box sx={{
         marginBottom: widget.marginBottom,
         marginTop: widget.marginTop,
         marginLeft: widget.marginLeft,
         marginRight: widget.marginRight,
         paddingTop: widget.paddingTop,
         paddingBottom: widget.paddingBottom,
         paddingLeft: widget.paddingLeft,
         paddingRight: widget.paddingRight,
         backgroundColor: widget.backgroundColor,
         textAlign: widget.justify,
         display: isVisible ? '' : 'none'
      }}>

         {IS_INPUTTEXT(widget) && widget.variant === 'inline' ?
            <Stack spacing={0.5} direction="row" sx={{ margin: 'auto', mt: '1em', mb: '1em' }}>
               <Typography
                  sx={{
                     fontSize: widget.fontSize,
                     fontFamily: widget.fontFamily,
                     fontStyle: widget.fontStyle,
                     fontWeight: widget.fontWeight,
                     color: widget.fontColor,
                     textAlign: widget.align,
                     lineHeight: widget.lineHeight,
                     letterSpacing: widget.letterSpacing,
                     width: widget.width ? widget.width : '100%'
                  }}
               >
                  {IS_INPUT_WIDGETS(widget) && widget.require ? widget.question + " *" : widget.question}
               </Typography>
               {children}
            </Stack> :
            <Box sx={{ margin: 'auto', mt: '1em', mb: '1em' }}>
               <Typography
                  sx={{
                     fontSize: widget.fontSize,
                     fontFamily: widget.fontFamily,
                     fontStyle: widget.fontStyle,
                     fontWeight: widget.fontWeight,
                     color: widget.fontColor,
                     textAlign: widget.align,
                     lineHeight: widget.lineHeight,
                     letterSpacing: widget.letterSpacing,
                     width: widget.width ? widget.width : '100%'

                  }}
               >
                  {IS_INPUT_WIDGETS(widget) && widget.require ? widget.question + " *" : widget.question}
               </Typography>

               {children}
            </Box>
         }
      </Box>
   )
}

export default ViewBase