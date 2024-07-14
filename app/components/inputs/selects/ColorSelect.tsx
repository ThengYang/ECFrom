"use client"

import { Button, Grid, IconButton, TextField } from "@mui/material";
import { HexAlphaColorPicker } from "react-colorful";
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import { FontColors } from "@/app/constants/Font";
import './ColorSelect.css';


interface ColorSelectProps {
   items?: Array<string>
   color?: string
   onChange?: (color: string) => void
}

const ColorSelect = (props: ColorSelectProps) => {

   const {
      items = FontColors,
      color = '#ffffff',
      onChange = (color: string) => void 0,

   } = props

   return (
      <Grid container spacing={1} sx={{ width: '250px', justifyContent: 'center', padding: '10px', alignItems: 'center' }}>
         <Grid item xs={8}>
            <TextField
               value={color}
               placeholder="HEXA"
               onChange={(event: any) => onChange(event.target.value)}
               variant="outlined"
               sx={{
                  width: '100%',
                  padding: 0,
               }}
               inputProps={{
                  style: {
                     padding: '5px'
                  }
               }}
               InputProps={{
                  style: {
                     height: '25px',
                     fontSize: 12,
                     borderRadius: 0
                  }
               }}
            />
         </Grid>
         <Grid item xs={2}>
            <SquareRoundedIcon sx={{ color: color === 'inherit' ? '#ffffff00' : color, fontSize: 32 }} />
         </Grid>
         <Grid item xs={2}>
            <IconButton size="small">
               <SaveRoundedIcon sx={{ fontSize: 32 }} />
            </IconButton>
         </Grid>
         <Grid item xs={12} sx={{ alignItems: 'center' }} className="color-select">
            <HexAlphaColorPicker color={color} onChange={onChange} />
         </Grid>
         <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', }}>
            <Button
               size="small"
               sx={{ textTransform: 'none' }}
               onClick={() => onChange("inherit")}
            >
               clear
            </Button>
         </Grid>
      </Grid>
   )

}

export default ColorSelect