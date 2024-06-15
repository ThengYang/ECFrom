"use client"

import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface GenericSelectProps {
   id?: string
   title?: string
   items: Array<string>
   value: string
   width?: number
   heigth?: number
   onChange?: Function
}

const GenericSelect = (props: GenericSelectProps) => {

   const {
      id = "generic-select-id",
      title = '',
      items = ['none'],
      value = 'none',
      width = null,
      heigth = null,
      onChange = () => void 0,
   } = props

   const handleChange = (event: SelectChangeEvent) => {
      onChange(event.target.value);
   };

   return (
      <FormControl sx={{ maxWidth: width, borderRadius: '0px' }} size="small">
         <InputLabel id={id + 'label'}>{title}</InputLabel>
         <Select
            labelId={id + 'label'}
            id={id}
            value={value.toLowerCase()}
            label={title}
            onChange={handleChange}
            sx={{ maxHeight: heigth, fontSize: '14px', width: '145px', overflow: 'hidden' }}
         >
            {items.map((item) =>
               <MenuItem value={item.toLowerCase()} key={item}>
                  {item}
               </MenuItem>
            )}
         </Select>
      </FormControl>
   );
}

export default GenericSelect