import { useState } from "react"

import {
   Box,
   Grid,
   Typography,
   Tooltip,
   Stack,
   Button,
   TextField,
   InputAdornment,
   Popover,
   Slider
}
   from "@mui/material"

import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import FormatAlignRightRoundedIcon from '@mui/icons-material/FormatAlignRightRounded';
import FormatAlignCenterRoundedIcon from '@mui/icons-material/FormatAlignCenterRounded';
import FormatAlignJustifyRoundedIcon from '@mui/icons-material/FormatAlignJustifyRounded';
import CircleIcon from '@mui/icons-material/Circle';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { WIDGET_BLOCK } from "@/app/constants/WigetType"
import GenericTab from "../../tabs/GenericTab";
import GenericSelect from "@/app/components/inputs/Selects";
import ColorSelect from "@/app/components/inputs/selects/ColorSelect";
import styles from "@/app/components/inputs/texts/Text.module.css";
import { FontColors, FontFamily } from "@/app/constants/Font";

interface OptionProps {
   activeWidget: WIDGET_BLOCK,
   updateWidget: (widget: WIDGET_BLOCK) => void
}

const StyleOption = (props: OptionProps) => {
   const { activeWidget, updateWidget } = props

   const [openFontColor, setOpenFontColor] = useState(false)
   const [anchorFontColor, setAnchoFontColor] = useState<HTMLButtonElement | null>(null);
   const [colorFor, setColorFor] = useState<string>('')
   const [customFontColor, setCustomFontColor] = useState<string>(
      activeWidget.fontColor ? activeWidget.fontColor : '#ffffff'
   )

   const triggerFontColorPopper = (event: any) => {
      setColorFor('font')
      setAnchoFontColor(event.target)
      if (activeWidget.fontColor) setCustomFontColor(activeWidget.fontColor)
      setOpenFontColor(!openFontColor)
   }

   const triggerBackgroundColorPopper = (event: any) => {
      setColorFor('background')
      setAnchoFontColor(event.target)
      if (activeWidget.backgroundColor) setCustomFontColor(activeWidget.backgroundColor)
      setOpenFontColor(!openFontColor)
   }

   const setWidgetColor = () => {
      if (colorFor === 'font') {
         updateWidget({
            ...activeWidget,
            fontColor: customFontColor
         })
      }
      else if (colorFor === 'background') {
         updateWidget({
            ...activeWidget,
            backgroundColor: customFontColor
         })
      }
      setOpenFontColor(false)
   }

   const setWidgetTextAlignment = (value: number) => {
      const newAlignment = ['left', 'center', 'right', 'justify'][value]

      updateWidget({
         ...activeWidget,
         align: newAlignment as 'left' | 'center' | 'right' | 'justify'
      })
   }

   const setWidgetFontFamily = (value: string) => {
      updateWidget({
         ...activeWidget,
         fontFamily: value
      })
   }

   const setWidgetFontSize = (value: string) => {
      const newFontSize = value ? parseFloat(value) : 16
      updateWidget({
         ...activeWidget,
         fontSize: newFontSize
      })
   }

   const setWidgetFontWeight = (value: number | string) => {
      updateWidget({
         ...activeWidget,
         fontWeight: value as number
      })
   }

   const setWidgetFontStyle = (value: string) => {
      updateWidget({
         ...activeWidget,
         fontStyle: value
      })
   }

   const setWidgetLineHeight = (value: string) => {
      const newLHeight = value ? parseFloat(value) : 1.5
      updateWidget({
         ...activeWidget,
         lineHeight: newLHeight
      })
   }

   const setWidgetLetterSpacing = (value: string) => {
      const newSpacing = value ? parseFloat(value) : 0

      updateWidget({
         ...activeWidget,
         letterSpacing: newSpacing
      })
   }

   const setWidgetWidth = (value: string) => {
      const newWidth = value ? parseFloat(value) : 0

      updateWidget({
         ...activeWidget,
         width: newWidth
      })
   }
   const setWidgetHeight = (value: string) => {
      const newHeight = value ? parseFloat(value) : 0

      updateWidget({
         ...activeWidget,
         height: newHeight
      })
   }

   const setWidgetMargins = (value: string, position: string) => {
      const marginT = (position === 'T') ? value ? parseFloat(value) : 0 : activeWidget.marginTop
      const marginL = (position === 'L') ? value ? parseFloat(value) : 0 : activeWidget.marginLeft
      const marginB = (position === 'B') ? value ? parseFloat(value) : 0 : activeWidget.marginBottom
      const marginR = (position === 'R') ? value ? parseFloat(value) : 0 : activeWidget.marginRight

      updateWidget({
         ...activeWidget,
         marginTop: marginT,
         marginLeft: marginL,
         marginBottom: marginB,
         marginRight: marginR
      })
   }

   const setWidgetPaddings = (value: string, position: string) => {

      const paddingT = (position === 'T') ? value ? parseFloat(value) : 0 : activeWidget.paddingTop
      const paddingL = (position === 'L') ? value ? parseFloat(value) : 0 : activeWidget.paddingLeft
      const paddingB = (position === 'B') ? value ? parseFloat(value) : 0 : activeWidget.paddingBottom
      const paddingR = (position === 'R') ? value ? parseFloat(value) : 0 : activeWidget.paddingRight

      updateWidget({
         ...activeWidget,
         paddingTop: paddingT,
         paddingLeft: paddingL,
         paddingBottom: paddingB,
         paddingRight: paddingR
      })
   }


   return (
      <Box>
         <Box>
            <Typography>
               Align text
            </Typography>
            <Box sx={{ mt: 1 }}>
               <GenericTab
                  activeTab={activeWidget.align === 'center' ? 1 :
                     activeWidget.align === 'right' ? 2 :
                        activeWidget.align === 'justify' ? 3 : 0
                  }
                  tabs={[
                     <Tooltip title="left" placement='top'>
                        <FormatAlignLeftRoundedIcon />
                     </Tooltip>
                     ,
                     <Tooltip title="center" placement='top'>
                        <FormatAlignCenterRoundedIcon />
                     </Tooltip>
                     ,
                     <Tooltip title="right" placement='top'>
                        <FormatAlignRightRoundedIcon />
                     </Tooltip>
                     ,
                     <Tooltip title="justify" placement='top'>
                        <FormatAlignJustifyRoundedIcon />
                     </Tooltip>
                  ]}
                  variant='filled'
                  onChange={setWidgetTextAlignment}
               />
            </Box>
         </Box>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Color
            </Typography>
            <Stack direction="column" spacing={0} sx={{ mt: 1.5 }}>
               <Button
                  variant='outlined'
                  color='inherit'
                  startIcon={activeWidget.fontColor === 'inherit' ? <NotInterestedIcon /> : <CircleIcon sx={{ color: activeWidget.fontColor }} />}
                  sx={{ borderRadius: 0, textTransform: 'none', justifyContent: 'left' }}
                  onClick={triggerFontColorPopper}
               >
                  Text
               </Button>
               <Button
                  variant='outlined'
                  color='inherit'
                  startIcon={activeWidget.backgroundColor === 'inherit' ? <NotInterestedIcon /> : <CircleIcon sx={{ color: activeWidget.backgroundColor }} />}
                  sx={{ borderRadius: 0, textTransform: 'none', justifyContent: 'left' }}
                  onClick={triggerBackgroundColorPopper}
               >
                  Background
               </Button>
            </Stack>
         </Box>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Font
            </Typography>
            <GenericSelect
               items={FontFamily}
               value={activeWidget.fontFamily}
               sx={{ borderRadius: 0, mt: 1 }}
               itemSX={FontFamily.map(font => ({ fontFamily: font.toLowerCase() }))}
               onChange={setWidgetFontFamily}
            />
         </Box>
         <Grid container spacing={2} sx={{ mt: 0.2 }}>
            <Grid item xs={12}>
               <Typography>
                  Font size
               </Typography>
            </Grid>
            <Grid item xs={6}>
               <TextField
                  value={activeWidget.fontSize && activeWidget.fontSize !== 16 ? activeWidget.fontSize : ''}
                  placeholder="16"
                  type='number'
                  size='small'
                  className={styles.number}
                  InputProps={{
                     style: {
                        borderRadius: 0,
                        maxHeight: 40,
                     },
                     endAdornment: <InputAdornment position='end'>px</InputAdornment>
                  }}
                  onChange={(event: any) => setWidgetFontSize(event.target.value)}
               />
            </Grid>
            <Grid item xs={6}>
               <Slider
                  value={activeWidget.fontSize ? activeWidget.fontSize : 16}
                  min={1}
                  max={100}
                  valueLabelDisplay="auto"
                  size="medium"
                  sx={{ padding: 0, mt: 2.2, '& .MuiSlider-thumb': { boxShadow: 'none', height: 16, width: 16 } }}
                  onChange={(event: Event, value: number | number[]) => setWidgetFontSize(value.toString())}
               />
            </Grid>
         </Grid>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Font weight
            </Typography>
            <GenericSelect
               value={activeWidget.fontWeight}
               items={[
                  { value: 'default', label: "Default" }, { value: 100, label: 'Thin' }, { value: 200, label: 'Extra Light' },
                  { value: 300, label: 'Light' }, { value: 400, label: 'Normal' }, { value: 500, label: 'Medium' },
                  { value: 600, label: 'Semi Bold' }, { value: 800, label: 'Bold' }, { value: 900, label: 'Extra Bold' }
               ]}
               itemSX={[
                  { fontWeight: 'default' }, { fontWeight: 100 }, { fontWeight: 200 }, { fontWeight: 300 },
                  { fontWeight: 400 }, { fontWeight: 500 }, { fontWeight: 600 }, { fontWeight: 800 }, { fontWeight: 900 }
               ]}
               sx={{ borderRadius: 0, mt: 1 }}
               onChange={setWidgetFontWeight}
            />
         </Box>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Font style
            </Typography>
            <GenericSelect
               value={activeWidget.fontStyle}
               items={['Normal', 'Italic']}
               itemSX={[{ fontStyle: 'normal' }, { fontStyle: 'italic' }]}
               sx={{ borderRadius: 0, mt: 1 }}
               onChange={setWidgetFontStyle}
            />
         </Box>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Spacing
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.1 }}>
               <Grid item xs={6}>
                  <TextField
                     value={activeWidget.lineHeight && activeWidget.lineHeight !== 1.5 ? activeWidget.lineHeight : ''}
                     label="Line height"
                     type='number'
                     size='small'
                     placeholder="1.5"
                     InputProps={{
                        style: {
                           borderRadius: 0,
                           maxHeight: 40,
                        },
                     }}

                     InputLabelProps={{ shrink: true }}
                     onChange={(event: any) => setWidgetLineHeight(event.target.value)}
                  />

               </Grid>
               <Grid item xs={6}>
                  <TextField
                     value={activeWidget.letterSpacing ? activeWidget.letterSpacing : ''}
                     placeholder="0"
                     label="Letter spacing"
                     type='number'
                     size='small'
                     className={styles.number}
                     InputProps={{
                        style: {
                           borderRadius: 0,
                           maxHeight: 40,
                        },
                        endAdornment: <InputAdornment position='end'>px</InputAdornment>
                     }}

                     InputLabelProps={{ shrink: true }}
                     onChange={(event: any) => setWidgetLetterSpacing(event.target.value)}
                  />
               </Grid>
            </Grid>
         </Box>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Dimension
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.1 }}>
               <Grid item xs={6}>
                  <TextField
                     value={activeWidget.width ? activeWidget.width : ''}
                     placeholder="0"
                     label="Width"
                     type='number'
                     size='small'
                     className={styles.number}
                     InputProps={{
                        style: {
                           borderRadius: 0,
                           maxHeight: 40,
                        },
                        endAdornment: <InputAdornment position='end'>px</InputAdornment>
                     }}

                     InputLabelProps={{ shrink: true }}
                     onChange={(event: any) => setWidgetWidth(event.target.value)}
                  />

               </Grid>
               <Grid item xs={6}>
                  <TextField
                     value={activeWidget.height ? activeWidget.height : ''}
                     placeholder="0"
                     label="Height"
                     type='number'
                     size='small'
                     className={styles.number}
                     InputProps={{
                        style: {
                           borderRadius: 0,
                           maxHeight: 40,
                        },
                        endAdornment: <InputAdornment position='end'>px</InputAdornment>
                     }}

                     InputLabelProps={{ shrink: true }}
                     onChange={(event: any) => setWidgetHeight(event.target.value)}
                  />
               </Grid>
            </Grid>
         </Box>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Margin
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.1 }}>
               {['T', 'R', 'B', 'L'].map(marg =>
                  <Grid item xs={3} key={"margin-" + marg}>
                     <TextField
                        value={
                           marg === 'T' ? activeWidget.marginTop || '' :
                              marg === 'R' ? activeWidget.marginRight || '' :
                                 marg === 'B' ? activeWidget.marginBottom || '' :
                                    activeWidget.marginLeft || ''
                        }
                        label={marg}
                        type='number'
                        size='small'
                        placeholder="0"
                        className={styles.number}
                        InputProps={{
                           style: {
                              borderRadius: 0,
                              maxHeight: 40,
                           },
                        }}

                        InputLabelProps={{ shrink: true }}
                        onChange={(event: any) => setWidgetMargins(event.target.value, marg)}
                     />
                  </Grid>
               )}
            </Grid>
         </Box>
         <Box sx={{ mt: 2 }}>
            <Typography>
               Padding
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.1 }}>
               {['T', 'R', 'B', 'L'].map(pad =>
                  <Grid item xs={3} key={"padding-" + pad}>
                     <TextField
                        value={
                           pad === 'T' ? activeWidget.paddingTop || '' :
                              pad === 'R' ? activeWidget.paddingRight || '' :
                                 pad === 'B' ? activeWidget.paddingBottom || '' :
                                    activeWidget.paddingLeft || ''
                        }
                        placeholder="0"
                        label={pad}
                        type='number'
                        size='small'
                        className={styles.number}
                        InputProps={{
                           style: {
                              borderRadius: 0,
                              maxHeight: 40,
                           },
                        }}

                        InputLabelProps={{ shrink: true }}
                        onChange={(event: any) => setWidgetPaddings(event.target.value, pad)}
                     />
                  </Grid>
               )}
            </Grid>
         </Box>

         <Popover
            id={'font-size-id'}
            open={openFontColor}
            anchorEl={anchorFontColor}
            onClose={setWidgetColor}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'center',
            }}
            transformOrigin={{
               vertical: 'center',
               horizontal: 'left',
            }}
         >
            <ColorSelect
               items={FontColors}
               color={customFontColor}
               onChange={setCustomFontColor}
            />
         </Popover>
      </Box>
   )
}

export default StyleOption