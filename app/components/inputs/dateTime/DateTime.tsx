
import { useState } from "react";
import dayjs from 'dayjs';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface DateTimeProps {
   value?: string
   setValue?: (val: string) => void
}
const DateTime = (props: DateTimeProps) => {

   const {
      value = null,
      setValue = () => void 0,
   } = props

   const [anchor, setAnchor] = useState(null);
   const [open, setOpen] = useState(false)

   const handlePickerButtonClick = (event: any) => {
      setAnchor(event.currentTarget)
      setOpen(!open)
   }

   const handleSetValue = (newValue: dayjs.Dayjs | null) => {
      if (newValue) {
         setValue(newValue.format("MM/DD/YYYY HH:mm"))
      }
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateTimePicker
            value={value ? dayjs(value) : null}
            open={open}
            onClose={() => setOpen(false)}
            onChange={handleSetValue}
            sx={{
               mt: 0.5,
               width: '100%',
               '.MuiInputBase-root': {
                  borderRadius: '0px',
               },
            }}
            slotProps={{
               field: {
                  clearable: true,
                  onClear: () => setValue('')
               },
               textField: {
                  size: 'small'
               },
               openPickerButton: {
                  onClick: handlePickerButtonClick
               },
               popper: {
                  placement:
                     'right-start',
                  anchorEl: anchor
               }
            }}
         />
      </LocalizationProvider>
   )
}

export default DateTime;