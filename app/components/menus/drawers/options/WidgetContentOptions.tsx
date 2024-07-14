import { useState } from "react"
import { Box, TextField, InputAdornment, Typography } from "@mui/material"

import { IS_INPUTTEXT, WIDGET_FILL } from "@/app/constants/WigetType"
import { TextBox } from "@/app/components/inputs/texts"
import GenericSelect from "@/app/components/inputs/Selects"

interface OptionProps {
   activeWidget: WIDGET_FILL
   updateWidget: (widget: WIDGET_FILL) => void
   widgetNames: { [key: string]: any }
   setWidgetNames: (name: { [key: string]: any }) => void
}

const WidgetContentOptions = (props: OptionProps) => {
   const { activeWidget, updateWidget, widgetNames, setWidgetNames } = props

   const [nameError, setNameError] = useState(false);
   const [nameErrorText, setNameErrorText] = useState("")

   const handleWidgetNameChanged = (value: string) => {

      if (activeWidget) {
         updateWidget({
            ...activeWidget,
            name: value
         })
      }

      if (widgetNames[value] && widgetNames[value].id !== activeWidget?.id) {
         setNameError(true);
         setNameErrorText("this name is asigned to another widget")
      }
      else if (!value) {
         setNameError(true)
         setNameErrorText("widget name cannot be empty")
      }
      else if (value.includes('->')) {
         setNameError(true)
         setNameErrorText("widget name cannot be contains ->")
      }
      else if (value.includes('$')) {
         setNameError(true)
         setNameErrorText("widget name cannot be contains $")
      }
      else {
         setNameError(false)
         setNameErrorText("")
      }
   }

   const setActiveWidgetName = () => {
      if (nameError) {
         for (const key in widgetNames) {
            if (widgetNames[key].id === activeWidget?.id) {
               handleWidgetNameChanged(key as string)
            }
         }
         setNameError(false)
      }
      else if (activeWidget) {
         let newWidgetNames = widgetNames
         for (const key in newWidgetNames) {
            if (newWidgetNames[key].id === activeWidget?.id) {
               delete newWidgetNames[key];
            }
         }
         newWidgetNames[activeWidget.name] = { id: activeWidget.id, type: activeWidget.type }
         setWidgetNames(newWidgetNames)
      }
   }

   const setWidgetContent = (value: string) => {
      updateWidget(
         {
            ...activeWidget,
            question: value
         }
      )
   }
   const setTextVariant = (value: string) => {
      if (IS_INPUTTEXT(activeWidget)) {
         updateWidget(
            {
               ...activeWidget,
               variant: value
            }
         )
      }
   }

   return (
      <Box>
         <TextField
            variant="outlined"
            value={activeWidget.name}
            placeholder="Widget name"
            size="small"
            helperText={nameErrorText}
            sx={{ width: '100%', marginBottom: '10px' }}
            InputProps={{

               startAdornment:
                  <InputAdornment position="start">
                     Name:
                  </InputAdornment>,

               style: { height: 32, fontSize: 14, borderRadius: 0 }
            }}
            error={nameError}
            onChange={(event: any) => handleWidgetNameChanged(event.target.value)}
            onBlur={setActiveWidgetName}
         />

         <TextBox
            placeholder="Content"
            value={activeWidget.question}
            setValue={setWidgetContent}
            sx={{
               marginBottom: '10px',
               minHeight: '200px',
               maxHeight: '200px',
               overflow: 'auto',
               fontSize: activeWidget.fontSize,
               color: activeWidget.fontColor,
               fontFamily: activeWidget.fontFamily,
               lineHeight: activeWidget.lineHeight,
               textAlign: activeWidget.align,
               borderRadius: 0
            }}
         />
         {IS_INPUTTEXT(activeWidget) ?
            <Box>
               <Typography sx={{ mb: 0.5 }}>Variant</Typography>
               <GenericSelect
                  items={['inline', 'under']}
                  value={activeWidget.variant}
                  onChange={setTextVariant}
                  sx={{ borderRadius: 0 }}
               />
            </Box>
            : <></>}
      </Box>
   )
}

export default WidgetContentOptions 