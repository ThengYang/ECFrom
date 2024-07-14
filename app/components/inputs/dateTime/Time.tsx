
import { useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';


interface TimeProps {
   value?: string
   setValue?: (val: string) => void
}
const Time = (props: TimeProps) => {

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
         setValue(newValue.format('HH:mm'))
      }
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <TimePicker
            value={value ? dayjs(value, "HH:mm") : null}
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
            viewRenderers={{
               hours: renderTimeViewClock,
               minutes: renderTimeViewClock,
               seconds: renderTimeViewClock,
            }}
         />
      </LocalizationProvider>
   )
}

export default Time;