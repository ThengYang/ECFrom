import { FormControl, FormControlLabel, Checkbox, RadioGroup, Radio, } from "@mui/material"

interface CheckProps {
   values: Array<string>
   options: Array<{ key: any, value: string }>
   setValue?: (values: Array<string>) => void
   row?: number
   varaint?: 'radio' | 'list'
}

const Check = (props: CheckProps) => {

   const {
      values,
      options,
      setValue = () => void 0,
      row = 0,
      varaint = 'radio'
   } = props

   const handleSetValue = (event: any) => {

      if (event.target.value !== 'none') {
         const newValues = varaint === 'radio' ? [event.target.value] :
            values.includes(event.target.value) ? values.filter(item => item !== event.target.value) :
               [...values, event.target.value];

         setValue(newValues)
      }
   }

   return (
      <FormControl sx={{ ml: 1 }}>
         <RadioGroup onChange={handleSetValue} row={row > 0}>
            {options.map(option =>
               <FormControlLabel
                  key={option.key}
                  value={option.value}
                  control={
                     varaint === 'radio' ? <Radio /> :
                        <Checkbox onChange={handleSetValue} />
                  }
                  label={option.value}
                  checked={values.includes(option.value)}
               />
            )}
         </RadioGroup>
      </FormControl>
   )
}

export default Check