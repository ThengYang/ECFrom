
import { useState, useCallback, useEffect } from "react";
import dayjs, { Dayjs } from 'dayjs';

import { Grid, Popover, Box } from "@mui/material";
import { DateField } from '@mui/x-date-pickers/DateField';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
   isSelected: boolean;
   isStart: boolean;
   isEnd: boolean;
   isLastOfMonth: boolean;
   isFirstOfMonth: boolean;
}

const CustomPickersDay = styled(PickersDay, {
   shouldForwardProp: (prop) =>
      prop !== 'isSelected' &&
      prop !== 'isStart' &&
      prop !== 'isEnd' &&
      prop !== 'isLastOfMonth' &&
      prop !== 'isFirstOfMonth'
})<CustomPickerDayProps>(({ theme, isSelected, isStart, isEnd, isLastOfMonth, isFirstOfMonth, day }) => ({

   ...(isSelected && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
         backgroundColor: theme.palette.primary.main,
         '.MuiTouchRipple-root': {
            borderRadius: 100,
            backgroundColor: 'red',
            opacity: 0.2,
         }
      },
      '&:focus': {
         backgroundColor: theme.palette.primary.main,
      },
      '&:not(.Mui-selected)': {
         borderWidth: 0,
      }
   }),
   ...((isStart || day.day() === 0 || isFirstOfMonth) && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
   }),
   ...((isEnd || day.day() === 6 || isLastOfMonth) && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
   }),

})) as React.ComponentType<CustomPickerDayProps>;

const IsSameDay = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
   if (dayB === null) {
      return false;
   }

   return dayA.isSame(dayB, 'day');
}

const isWithinRange = (dayA: Dayjs, dayB: Dayjs | null | undefined, dayC: Dayjs | null | undefined) => {
   if (!dayB || !dayC) return false;

   return (dayA.add(1, 'day') >= dayB && dayA <= dayC)
}

const isLastDayOfMonth = (day: Dayjs | null | undefined) => {
   if (!day) return false;
   return day.isSame(day.endOf('month'), 'day');
};
const isFirstDayOfMonth = (day: Dayjs | null | undefined) => {
   if (!day) return false;
   return day.isSame(day.startOf('month'), 'day');
};

function Day(
   props: PickersDayProps<Dayjs> & {
      selectedDay?: Dayjs | null;
      hoveredDay?: Dayjs | null;
   },
) {
   const { day, selectedDay, hoveredDay, ...other } = props;

   return (
      <CustomPickersDay
         {...other}
         day={day}
         disableMargin
         selected={false}
         isSelected={isWithinRange(day, selectedDay, hoveredDay)}
         isStart={IsSameDay(day, selectedDay)}
         isEnd={IsSameDay(day, hoveredDay)}
         isFirstOfMonth={isFirstDayOfMonth(day)}
         isLastOfMonth={isLastDayOfMonth(day)}
      />
   );
}

const CalendarHeaderRoot = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   padding: '8px 16px',
   alignItems: 'center',
   position: 'relative',
});

interface CalendarHeaderProps {

   startDate: Dayjs
   endDate: Dayjs
   calendarProps?: PickersCalendarHeaderProps<Dayjs>
   setStartDate?: (date: Dayjs) => void
   setEndDate?: (date: Dayjs) => void

}

const StartCalendarHeader = (props: CalendarHeaderProps) => {

   const {
      startDate,
      endDate,
      setStartDate = () => void 0,
      setEndDate = () => void 0
   } = props;

   const handleDateChange = () => {
      setStartDate(startDate.subtract(1, 'month'))
      setEndDate(endDate.subtract(1, 'month'))
   }

   return (
      <CalendarHeaderRoot>
         <Stack spacing={1} direction="row">
            <IconButton
               onClick={handleDateChange}
               title="Previous month"
               size="small"
               sx={{
                  position: 'absolute',
                  left: '5%',
                  top: 0,
                  bottom: 0,
                  color: '#000000'
               }}
            >
               <ChevronLeft sx={{ fontSize: 30 }} />
            </IconButton>
         </Stack>
         <Typography>{startDate.format('MMMM YYYY')}</Typography>
      </CalendarHeaderRoot>
   );
}

const EndCalendarHeader = (props: CalendarHeaderProps) => {
   const {
      startDate,
      endDate,
      setStartDate = () => void 0,
      setEndDate = () => void 0
   } = props;

   const handleDateChange = () => {
      setStartDate(startDate.add(1, 'month'))
      setEndDate(endDate.add(1, 'month'))
   }

   return (
      <CalendarHeaderRoot>
         <Stack spacing={1} direction="row">
            <IconButton
               onClick={handleDateChange}
               title="Previous month"
               size="small"
               sx={{
                  position: 'absolute',
                  right: '5%',
                  top: 0,
                  bottom: 0,
                  color: '#000000'
               }}
            >
               <ChevronRight sx={{ fontSize: 30 }} />
            </IconButton>
         </Stack>
         <Typography>{endDate.format('MMMM YYYY')}</Typography>
      </CalendarHeaderRoot>
   );
}

interface DateRangeProps {
   value?: string
   setValue?: (val: string) => void
}
const DateRange = (props: DateRangeProps) => {

   const {
      value = '',
      setValue = () => void 0,
   } = props

   const [anchor, setAnchor] = useState(null);
   const [open, setOpen] = useState(false)

   const [startDate, setStartDate] = useState<Dayjs>(dayjs());
   const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(1, 'month'))
   const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null)
   const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null)
   const [toSetDate, setToSetDate] = useState('start')
   const [fieldFocus, setFieldFocus] = useState<string>('')

   const handleOnFocus = (event: any, field: string) => {
      setOpen(true)
      setAnchor(event.currentTarget)
      setFieldFocus(field)
      setToSetDate(field)
   }

   const handleClosePicker = () => {
      setOpen(false)
      setFieldFocus('')
      setToSetDate('')
   }

   const handleSetSelectedDate = (newDate: Dayjs) => {

      if (toSetDate === 'end') {
         if (selectedStartDate && newDate > selectedStartDate) {
            setSelectedEndDate(newDate)
            setToSetDate('start')
            setFieldFocus('')
            setOpen(false)
         }
         else if (selectedStartDate && newDate < selectedStartDate) {
            setSelectedEndDate(newDate)
            setSelectedStartDate(null)
            setToSetDate('start')
            setFieldFocus('start')
         }
         else if (!selectedStartDate) {
            setSelectedEndDate(newDate)
            setToSetDate('start')
            setFieldFocus('start')
         }
      }
      else if (toSetDate === 'start') {
         setSelectedStartDate(newDate)
         setFieldFocus('end')
         setToSetDate('end')
         if (selectedEndDate && newDate > selectedEndDate) {
            setSelectedEndDate(null);
         }
      }
   }
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Grid container spacing={0}>
            <Grid item xs={5.75}>
               <DateField
                  value={selectedStartDate}
                  sx={{
                     mt: 0.5,
                     width: '100%',
                     '.MuiInputBase-root': {
                        borderRadius: '0px',
                     },
                  }}
                  slotProps={{
                     textField: {
                        size: 'small'
                     }
                  }}
                  focused={fieldFocus === 'start'}
                  onClick={(event: any) => handleOnFocus(event, 'start')}
               />
            </Grid>
            <Grid item xs={0.5} sx={{ position: 'relative' }}>
               <HorizontalRuleIcon sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} />
            </Grid>
            <Grid item xs={5.75}>
               <DateField
                  value={selectedEndDate}
                  sx={{
                     mt: 0.5,
                     width: '100%',
                     '.MuiInputBase-root': {
                        borderRadius: '0px',
                     },
                  }}
                  slotProps={{
                     textField: {
                        size: 'small'
                     }
                  }}
                  focused={fieldFocus === 'end'}
                  onClick={(event: any) => handleOnFocus(event, 'end')}
               />
            </Grid>
         </Grid>
         <Popover
            open={open}
            onClose={handleClosePicker}
            anchorEl={anchor}
            disableScrollLock={true}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}

            sx={{ mt: 1 }}
         >
            <Grid container sx={{ p: 1, width: '100%' }}>
               <Grid item xs={6} sx={{ borderRight: '1px solid' }}>
                  <DateCalendar
                     value={startDate}
                     slots={{
                        calendarHeader: () =>
                           <StartCalendarHeader
                              startDate={startDate}
                              endDate={endDate}
                              setStartDate={setStartDate}
                              setEndDate={setEndDate}
                           />,
                        day: Day

                     }}
                     slotProps={{
                        day: () =>
                           ({
                              selectedDay: selectedStartDate,
                              hoveredDay: selectedEndDate,
                           }) as any,
                     }}
                     onChange={(value: any) => handleSetSelectedDate(value)}
                  />
               </Grid>
               <Grid item xs={6} sx={{ borderLeft: '1px solid' }}>
                  <DateCalendar
                     value={endDate}
                     slots={{
                        calendarHeader: () =>
                           <EndCalendarHeader
                              startDate={startDate}
                              endDate={endDate}
                              setStartDate={setStartDate}
                              setEndDate={setEndDate}
                           />,
                        day: Day
                     }}
                     slotProps={{
                        day: () =>
                           ({
                              selectedDay: selectedStartDate,
                              hoveredDay: selectedEndDate,
                           }) as any,
                     }}

                     onChange={(value: any) => handleSetSelectedDate(value)}
                  />
               </Grid>
            </Grid>
         </Popover>
      </LocalizationProvider>
   )
}

export default DateRange;