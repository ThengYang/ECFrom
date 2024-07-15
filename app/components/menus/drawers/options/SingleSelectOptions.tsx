import { useState } from "react"
import { Box, TextField, Button, IconButton, Typography, InputAdornment } from "@mui/material"

import { INPUTSELECT, INPUTMULTISELECT } from "@/app/constants/WigetType"

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface OptionProps {
   activeWidget: INPUTSELECT | INPUTMULTISELECT
   updateWidget: (widget: INPUTSELECT | INPUTMULTISELECT) => void
}

const SingleSelectSettingOptions = (props: OptionProps) => {
   const { activeWidget, updateWidget } = props
   const [isEmptyAt, setisIsEmptyAt] = useState<Array<number>>(
      activeWidget.options.map((item, index) => item.value === '' ? index : -1).filter(item => item !== -1)
   )

   const setWidegetOptions = (index: number | null, option: { key: number, value: string } | null) => {
      let newWidget = { ...activeWidget }
      if (index === null) {
         const id = (Date.now() + Math.floor(Math.random() * 1000000)) % 10000;
         newWidget.options.push({ key: id, value: 'Option' })
      }
      else if (option) {
         newWidget.options[index] = option;
      }
      updateWidget(newWidget)
   }

   const deleteWidgetOption = (index: number) => {
      let newWidget = activeWidget
      newWidget.options.splice(index, 1)
      updateWidget(newWidget)
   }

   const checkForEmpty = (index: number) => {
      if (!activeWidget.options[index].value) {
         setisIsEmptyAt([...isEmptyAt, index])
      }
      else {
         setisIsEmptyAt(isEmptyAt.filter(item => item !== index))
      }
   }

   return (
      <Box sx={{ mb: 4 }}>
         <Typography sx={{ mb: 0.5 }}>Options</Typography>
         {activeWidget.options.map((opt, index) =>
            <Box sx={{ my: 1 }} key={opt.key}>
               <TextField
                  value={opt.value}
                  size="small"
                  autoFocus
                  error={isEmptyAt.includes(index)}
                  helperText={isEmptyAt.includes(index) ? "empty option will be hidden" : ""}
                  sx={{ width: '100%' }}
                  InputProps={{
                     endAdornment:
                        <InputAdornment position="end">
                           <IconButton
                              color='error'
                              size='small'
                              onClick={() => deleteWidgetOption(index)}
                              disabled={activeWidget.options.length <= 1}
                           >
                              <DeleteIcon />
                           </IconButton>
                        </InputAdornment>,
                     style: { borderRadius: 0 }

                  }}
                  onChange={(event: any) => setWidegetOptions(index, { key: opt.key, value: event.target.value })}
                  onBlur={() => checkForEmpty(index)}
               />
            </Box>
         )}
         <Box sx={{ m: 1 }}>
            <Button
               size="small"
               sx={{ textTransform: 'none', boxShadow: 'none', float: 'right' }}
               startIcon={<AddIcon />}
               onClick={() => setWidegetOptions(null, null)}
            >
               Add more
            </Button>
         </Box>
      </Box>
   )
}
export { SingleSelectSettingOptions }