import { useState } from "react"
import { Box, Grid, TextField, Typography, Slider } from "@mui/material"

import GenericSelect from "../Selects"
import { FontFamily } from "@/app/constants/Font"

interface TypographySelectProps {
   fontFamily: string
   setFontFamily: (value: string) => void
   fontSize: number
   setFontSize: (value: number) => void
}
const TypographySelect = (props: TypographySelectProps) => {

   const {
      fontFamily,
      setFontFamily,
      fontSize,
      setFontSize,
   } = props

   return (
      <Box >


      </Box>
   )
}

export default TypographySelect