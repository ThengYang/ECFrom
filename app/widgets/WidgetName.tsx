import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface WidgetNameProps {
   value: string
   id: string,
   type: string,
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
      type,
      setValue = () => void 0,
      visible = true,
      widgetNames,
      setWidgetNames,
      onFocus = () => void 0,
   } = props

   const [error, setError] = useState<boolean>(false)
   const [errorText, setErrorText] = useState<string>('')

   const changeName = (event: any) => {
      setValue(event.target.value)
      if (widgetNames[event.target.value] && widgetNames[event.target.value] !== id) {
         setError(true)
         setErrorText("this name is assigned to another widget")
      }
      else if (!event.target.value) {
         setError(true)
         setErrorText("widget name cannot be empty")
      }
      else if (event.target.value.includes("$")) {
         setError(true)
         setErrorText("widget name cannot contains $")
      }
      else if (event.target.value.includes("->")) {
         setError(true)
         setErrorText("widget name cannot contains ->")
      }
      else {
         setError(false)
         setErrorText('')
      }
   }

   const handleSetValue = () => {
      if (error) {
         for (const key in widgetNames) {
            if (widgetNames[key].id === id) {
               setValue(key as string)
            }
         }
         setError(false)
         setErrorText('')
      }
      else {
         let newWidgetNames = widgetNames
         for (const key in newWidgetNames) {
            if (newWidgetNames[key].id === id) {
               delete newWidgetNames[key];
            }
         }
         newWidgetNames[value] = { id: id, type: type }
         setWidgetNames(newWidgetNames)

      }
   }

   return (
      <Box sx={{ textAlign: 'left' }}>
         <TextField
            variant="outlined"
            placeholder="Widget Name"
            value={value}
            size='small'
            error={error}

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
               display: (error) ? 'inline' : 'none',
               marginLeft: '5px',
               fontSize: 12
            }}
         >
            {errorText}
         </Typography>
      </Box>
   )
}

export default WidgetName