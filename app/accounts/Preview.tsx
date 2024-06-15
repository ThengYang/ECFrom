
import { TextField, Typography, Box } from "@mui/material"
import { WIDGET_TYPE, IS_INPUTTEXT, IS_TEXT } from "../constants/WigetType";


const constructWidget = (widget: WIDGET_TYPE) => {
   if (IS_TEXT(widget)) {
      return (
         <Typography
            sx={{
               fontSize: widget.fontSize,
               color: widget.fontColor,
               textAlign: widget.align,
               lineHeight: widget.lineHeight,
               marginTop: widget.marginTop,
               marginLeft: widget.marginLeft,
               marginBottom: widget.marginBottom,
               marginRight: widget.marginRight
            }}
         >
            {widget.value}
         </Typography>
      )
   }
   else if (IS_INPUTTEXT(widget)) {
      return (
         <Box sx={{
            marginTop: widget.marginTop,
            marginLeft: widget.marginLeft,
            marginBottom: widget.marginBottom,
            marginRight: widget.marginRight,
            textAlign: widget.justify
         }}>
            <Box sx={{ textAlign: 'left', display: 'inline-block', width: '80%' }}>
               <Typography
                  sx={{
                     fontSize: widget.fontSize,
                     color: widget.fontColor,
                     lineHeight: widget.lineHeight,
                     textAlign: widget.align
                  }}
               >
                  {widget.question}
               </Typography>
               <TextField
                  size="small"
                  type={widget.responseType}
                  required={widget.require}
                  sx={{ width: '100%' }}
               />
            </Box>
         </Box>
      )
   }
}


interface PreviewProps {
   widgets: Array<WIDGET_TYPE>
}

const Preview = (props: PreviewProps) => {
   const { widgets } = props
   return (
      <Box className="h-screen  items-center w-full px-10">
         {widgets.map((item) => constructWidget(item)

         )}
      </Box>
   )
}

export default Preview