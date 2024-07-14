import { FormControl, MenuItem, Select } from "@mui/material"


interface SingleSelectProps {
   value: string,
   options: Array<{ key: any, value: string }>
   setValue?: (value: string) => void
}
const SingleSelect = (props: SingleSelectProps) => {

   const {
      value,
      options,
      setValue = () => void 0,
   } = props
   return (
      <FormControl sx={{ mt: 0.5, width: '100%' }} size="small">
         <Select
            value={value ? value : ''}
            onChange={(event: any) => setValue(event.target.value)}
            sx={{ borderRadius: 1 }}
         >
            {options.map(opt =>
               <MenuItem value={opt.value} key={opt.key} sx={{ display: opt.value === '' ? 'none' : '' }}>
                  {opt.value}
               </MenuItem>
            )}
         </Select>
      </FormControl>
   )
}

export default SingleSelect