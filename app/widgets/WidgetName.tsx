import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface WidgetNameProps {
   value: string
   id: string
   setValue: (value: string) => void
   visible: boolean,
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   onFocus?: () => void
}

const WidgetName = (props: WidgetNameProps) => {
   const {
      value = '',
      id,
      setValue = () => void 0,
      visible = true,
      widgetNames,
      setWidgetNames,
      onFocus = () => void 0,
   } = props


   const [isExisted, setIsExisted] = useState<boolean>(false)

   const changeName = (event: any) => {
      setValue(event.target.value)
      if (widgetNames[event.target.value] && widgetNames[event.target.value] !== id) {
         setIsExisted(true)
      }

   }
   const handleSetValue = () => {
      if (isExisted) {
         for (const key in widgetNames) {
            if (widgetNames[key] === id) {
               setValue(key as string)
            }
         }
         setIsExisted(false)
      }
      else {
         let newWidgetNames = widgetNames
         for (const key in newWidgetNames) {
            if (newWidgetNames[key] === id) {
               delete newWidgetNames[key];
            }
         }
         newWidgetNames[value] = id
         setWidgetNames(newWidgetNames)

      }
      setIsExisted(false)
   }

   return (
      <Box>
         <TextField
            variant="outlined"
            placeholder="Widget Name"
            value={value}
            size='small'
            error={isExisted}
            inputProps={{
               style: {
                  height: '8px',
                  fontSize: '12px'
               },
               className: 'widget'
            }}
            InputProps={{
               style: {
                  borderRadius: '0px',
               },
            }}
            style={{ display: visible ? '' : 'none' }}
            onChange={changeName}
            onFocus={onFocus}
            onBlur={handleSetValue}
         />
         <Typography
            color='error'
            sx={{
               display: isExisted ? 'inline' : 'none',
               marginLeft: '5px',
               fontSize: 12
            }}
         >
            this name is assigned to another widget
         </Typography>
      </Box>
   )
}

export default WidgetName