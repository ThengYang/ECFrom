"use client"

import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Typography, Box } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface GenericSelectProps {
   id?: string
   title?: string
   items: Array<string> | Array<{ value: string | number, label: string | number }>
   value: string | number,
   disable?: boolean,
   visible?: boolean,
   width?: number
   heigth?: number
   onChange?: Function
   sx?: any,
   itemSX?: Array<any>
   variant?: 'contained' | 'inline'
}

const GenericSelect = (props: GenericSelectProps) => {

   const {
      id = "generic-select-id",
      title = '',
      items = ['none'],
      value = 'none',
      disable = false,
      visible = true,
      width = null,
      heigth = null,
      onChange = () => void 0,
      sx = { maxHeight: heigth, fontSize: '14px', width: '145px', overflow: 'hidden' },
      itemSX = null,
      variant = 'contained'
   } = props

   const handleChange = (event: SelectChangeEvent) => {
      onChange(event.target.value);
   };


   return (
      <Box sx={{ display: visible ? variant === 'inline' ? 'inline-block' : 'block' : 'none' }}>
         <Typography sx={{ display: variant === 'inline' ? 'inline' : 'none', mr: 0.5 }}>{title}</Typography>
         <FormControl sx={{ width: '100%', maxWidth: width, borderRadius: '0px', p: 0 }} size="small">
            <InputLabel id={id + 'label'} sx={{ display: variant !== 'inline' ? "" : 'none' }}>{title}</InputLabel>
            <Select
               labelId={id + 'label'}
               id={id}
               value={value.toString()}
               label={variant !== 'inline' ? title : ''}
               disabled={disable}
               onChange={handleChange}
               sx={variant === 'inline' ?
                  {
                     ...sx, width: 'fit-content', '.MuiInputBase-input':
                        { padding: '0px 5px', marginTop: '2px' }
                  } : sx
               }
            >
               {items.map((item, idx) => (typeof item === 'string') ?
                  <MenuItem
                     value={item}
                     key={idx}
                     sx={itemSX ? itemSX[idx] : itemSX}
                  >
                     {item}
                  </MenuItem> :
                  <MenuItem
                     value={item.value}
                     key={idx}
                     sx={itemSX ? itemSX[idx] : itemSX}
                  >
                     {item.label ? item.label : item.value}
                  </MenuItem>
               )}
            </Select>
         </FormControl>
      </Box>
   );
}

export default GenericSelect