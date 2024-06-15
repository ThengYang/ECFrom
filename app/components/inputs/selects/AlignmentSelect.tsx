"use client"

import React from "react"

import { Grid, IconButton } from "@mui/material";

import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import FormatAlignRightRoundedIcon from '@mui/icons-material/FormatAlignRightRounded';
import FormatAlignCenterRoundedIcon from '@mui/icons-material/FormatAlignCenterRounded';
import FormatAlignJustifyRoundedIcon from '@mui/icons-material/FormatAlignJustifyRounded';

interface AligmantSelectProps {
   value?: string
   onChange?: Function
}

const AligmantSelect = (props: AligmantSelectProps) => {

   const { value = '', onChange = () => void 0 } = props

   const handleOnchange = (event: any) => {
      onChange(event.currentTarget.value)
   }

   return (
      <Grid container spacing={1}>
         {Array.from(['left', 'center', 'right', 'justify'], (align) =>
            <Grid item key={'align-' + align}>
               <IconButton
                  value={align}
                  sx={{
                     borderRadius: '0px',
                     border: '1px solid gray',
                     padding: '5px',
                     backgroundColor: align === value ? '#b4e0f4' : 'inherit',
                     '&:hover': {
                        backgroundColor: align === value ? '#b4e0f4' : '#efeded'
                     }
                  }}
                  onClick={handleOnchange}
               >
                  {align === 'left' ? <FormatAlignLeftRoundedIcon sx={{ fontSize: 18 }} /> : align === 'center' ?
                     <FormatAlignCenterRoundedIcon sx={{ fontSize: 18 }} /> : align === 'right' ?
                        <FormatAlignRightRoundedIcon sx={{ fontSize: 18 }} /> :
                        <FormatAlignJustifyRoundedIcon sx={{ fontSize: 18 }} />
                  }
               </IconButton>
            </Grid>
         )}
      </Grid>
   )

}

export default AligmantSelect