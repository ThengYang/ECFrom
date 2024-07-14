import { Box, TextField, FormControl, MenuItem, Select, Grid, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

interface InputMultiSelectProps {
   values: Array<string>
   options: Array<{ key: any, value: string }>
   setValue?: (value: Array<string>) => void
}

const MultiSelect = (props: InputMultiSelectProps) => {
   const {
      values,
      options,
      setValue = () => void 0
   } = props

   const handleAddValue = (event: any) => {
      const index = values.find(item => item === event.target.value)
      if (index === undefined) setValue([...values, event.target.value])
   }

   const handleRemoveValue = (index: number) => {
      setValue(values.filter((_, indx) => indx !== index))
   }

   return (
      <Box>
         <FormControl sx={{ mt: 0.5, width: '100%' }} size="small">
            <Select
               value={'none'}
               onChange={handleAddValue}
               sx={{ borderRadius: 1 }}
            >
               <MenuItem key={-1} value={'none'}>
                  Choose an option
               </MenuItem>
               {options.map(opt =>
                  <MenuItem value={opt.value} key={opt.key}>
                     {opt.value}
                  </MenuItem>
               )}
            </Select>
         </FormControl>
         <Grid
            container
            sx={{
               minHeight: 50,
               border: '1px solid #aeb2b2',
               mt: 0.5,
               textAlign: 'center',
               justifyContent: 'center',
               borderRadius: 1,
            }}
         >
            {values.map((ans, indx) =>
               <Grid item key={indx} sx={{ m: 1, width: (ans.length * 1.6).toString() + "ch", minWidth: 120 }}>
                  <TextField
                     value={ans}
                     variant="outlined"
                     size="small"
                     InputProps={{
                        readOnly: true,
                        endAdornment:
                           <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRemoveValue(indx)}
                              disableRipple
                           >
                              <CloseIcon />
                           </IconButton>
                     }}
                  />
               </Grid>
            )}
         </Grid>
      </Box>
   )

}

export default MultiSelect