
import { useState } from "react";
import styles from "@/app/components/inputs/texts/Text.module.css"

import {
   Box,
   Divider,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Collapse,
   TextField,
   InputAdornment,
   Typography,
   Grid,
   Popover,
   IconButton,
   Slider,
   Checkbox,
   Button
} from "@mui/material"

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';
import FontDownloadRoundedIcon from '@mui/icons-material/FontDownloadRounded';


import { SubtitleText, TitleText } from "@/app/widgets/texts/DragItems";
import { FormGrid } from "@/app/widgets/layout/DragItems";

import {
   TextResponse,
   SingleSelect,
   MultiSelect,
   DateTime,
   CheckList,
   Table
} from "@/app/widgets/Inputs/DragItems";

import {
   WIDGET_TYPE,
   IS_INPUT_WIDGETS,
   IS_SELECT_WIDGETS,
   IS_INPUTTEXT,
   IS_TEXT,
   IS_INPUTSELECT,
   IS_INPUTMULTISELECT,
   IS_INPUTDATETIME,
   HAS_STYLE_WIDGETS,
   HAS_RESPOND_TYPE,
   HAS_FLEX_COLUMN,
   GET_RESPOND_TYPE,
   IS_INPUTCHECKLIST,
   IS_INPUTTABLE
} from "@/app/constants/WigetType";

import { TextBox } from "../inputs/texts";
import AligmantSelect from "../inputs/selects/AlignmentSelect";
import ColorSelect from "../inputs/selects/ColorSelect";
import { FontColors, FontFamily } from "@/app/constants/Font";
import GenericSelect from "../inputs/Selects";
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface WidgetDrawerProps {
   activeWidget: WIDGET_TYPE | null
   updateWidget?: (widget: WIDGET_TYPE) => void
   widgetNames: { [key: string]: any }
   setWidgetNames: (name: { [key: string]: any }) => void
}

const WidgetDrawer = (props: WidgetDrawerProps) => {

   const {
      activeWidget,
      updateWidget = (widget: WIDGET_TYPE) => void 0,
      widgetNames,
      setWidgetNames,
   } = props

   const [nameExisted, setNameExisted] = useState(false);
   const [isLayout, setIsLayout] = useState(false);
   const [isMenu, setIsMenu] = useState(false);
   const [isText, setIsText] = useState(false);
   const [isInput, setIsInput] = useState(false);

   const [openFontColor, setOpenFontColor] = useState(false)
   const [anchorFontColor, setAnchoFontColor] = useState<HTMLButtonElement | null>(null);
   const [customFontColor, setCustomFontColor] = useState<string>(
      (IS_INPUT_WIDGETS(activeWidget)) ? activeWidget.fontColor : '#ffffff'
   )

   const [customFontSize, setCustomFontSize] = useState<string | null>(null)
   const [customLineHeight, setCustomLineHeight] = useState<string | null>(null)
   const [customMargin, setCustomMargin] = useState<{ top: string, right: string, bottom: string, left: string } | null>(null)

   const setWidgetName = (eventVal: any) => {
      let newWidget = activeWidget
      if (newWidget) {
         newWidget.name = eventVal?.target ? eventVal.target.value : eventVal
         updateWidget(newWidget)
      }
      if (eventVal?.target) {
         if (
            widgetNames[eventVal.target.value] &&
            widgetNames[eventVal.target.value] !== activeWidget?.id
         ) setNameExisted(true);
      }
   }

   const resetWidgetName = () => {
      if (nameExisted) {
         for (const key in widgetNames) {
            if (widgetNames[key] === activeWidget?.id) {
               setWidgetName(key as string)
            }
         }
         setNameExisted(false)
      }
      else if (activeWidget) {
         let newWidgetNames = widgetNames
         for (const key in newWidgetNames) {
            if (newWidgetNames[key] === activeWidget?.id) {
               delete newWidgetNames[key];
            }
         }
         newWidgetNames[activeWidget.name] = activeWidget.id
         setWidgetNames(newWidgetNames)
      }
   }

   const setWidgetRequired = (event: any) => {
      if (IS_INPUT_WIDGETS(activeWidget)) {
         let newWidget = activeWidget
         newWidget.require = event.target.checked
         updateWidget(newWidget)
      }
   }

   const setWidgetResponseType = (value: string) => {
      if (HAS_RESPOND_TYPE(activeWidget)) {
         let newWidget = activeWidget
         newWidget.responseType = value as any
         newWidget.answer = []
         updateWidget(newWidget)
      }
   }

   const setWidgetGroupColumn = (event: any) => {
      if (HAS_FLEX_COLUMN(activeWidget)) {
         let newWidget = activeWidget
         newWidget.groupColumn = event.target.value as number
         updateWidget(newWidget)
      }
   }

   const setWidgetFontColor = () => {
      if (HAS_STYLE_WIDGETS(activeWidget)) {
         let newWidget = activeWidget
         newWidget.fontColor = customFontColor
         updateWidget(newWidget)
      }
      setOpenFontColor(false)
   }

   const setWidgetTextAlignment = (value: "left" | "center" | "right" | "justify") => {
      if (value && HAS_STYLE_WIDGETS(activeWidget)) {
         let newWidget = activeWidget
         newWidget.align = value
         updateWidget(newWidget)
      }
   }

   const setWidgetJustify = (value: "left" | "center" | "right") => {
      if (value && HAS_STYLE_WIDGETS(activeWidget)) {
         let newWidget = activeWidget
         newWidget.justify = value
         updateWidget(newWidget)
      }
   }

   const setWidgetFontFamily = (value: string) => {
      if (value && HAS_STYLE_WIDGETS(activeWidget)) {
         let newWidget = activeWidget
         newWidget.fontFamily = value
         updateWidget(newWidget)
      }
   }

   const setWidgetFontSize = (value: any = null) => {
      if (HAS_STYLE_WIDGETS(activeWidget)) {
         const val = value ? parseFloat(value) : parseFloat(customFontSize as string)
         if (!isNaN(val) && val >= 10 && val <= 40) {
            let newWidget = activeWidget
            newWidget.fontSize = val
            updateWidget(newWidget)
         }
         setCustomFontSize(null)
      }
   }

   const setWidgetLineHeight = (value: string | null = null) => {
      if (HAS_STYLE_WIDGETS(activeWidget)) {
         const val = value ? parseFloat(value) : parseFloat(customLineHeight as string)
         if (!isNaN(val) && val >= 1 && val <= 10) {
            let newWidget = activeWidget
            newWidget.lineHeight = val as number
            updateWidget(newWidget)
         }
         setCustomLineHeight(null)
      }
   }

   const setWidgetMargin = () => {
      if (HAS_STYLE_WIDGETS(activeWidget)) {
         const top = parseFloat(customMargin?.top as string)
         const right = parseFloat(customMargin?.right as string)
         const bottom = parseFloat(customMargin?.bottom as string)
         const left = parseFloat(customMargin?.left as string)

         let newWidget = activeWidget
         if (!isNaN(top)) newWidget.marginTop = top;
         if (!isNaN(right)) newWidget.marginRight = right;
         if (!isNaN(bottom)) newWidget.marginBottom = bottom;
         if (!isNaN(left)) newWidget.marginLeft = left;

         updateWidget(newWidget);
      }
   }

   const setWidgetContent = (value: string) => {
      if (activeWidget) {
         let newWidget = activeWidget

         if (IS_INPUT_WIDGETS(newWidget)) {
            newWidget.question = value
         }
         else if (IS_TEXT(newWidget)) {
            newWidget.value = value
         }
         updateWidget(newWidget)
      }
   }

   const setWidegetOptions = (index: number | null, option: { key: number, value: string } | null) => {
      if (IS_SELECT_WIDGETS(activeWidget)) {
         let newWidget = activeWidget
         if (index === null) {
            const id = (Date.now() + Math.floor(Math.random() * 1000000)) % 10000;
            activeWidget.options.push({ key: id, value: 'Option' })
         }
         else if (option) {
            activeWidget.options[index] = option;
         }
         updateWidget(newWidget)
      }
   }

   const deleteWidgetOption = (index: number) => {
      if (IS_INPUTSELECT(activeWidget)) {
         let newWidget = activeWidget
         newWidget.options.splice(index, 1)
         updateWidget(newWidget)
      }
      else if (IS_INPUTMULTISELECT(activeWidget) || IS_INPUTCHECKLIST(activeWidget)) {
         let newWidget = activeWidget
         const option = newWidget.options[index]
         newWidget.answer = newWidget.answer.filter(item => item !== option.value)
         newWidget.options.splice(index, 1)
         updateWidget(newWidget)
      }
   }

   if (IS_INPUT_WIDGETS(activeWidget) || IS_TEXT(activeWidget)) {
      return (
         <Box sx={{ padding: '0 0.3em', height: '100%' }} id='active-widget-editor'>
            <TextField
               variant="outlined"
               value={activeWidget.name}
               placeholder="Widget name"
               size="small"
               sx={{ width: '100%', marginBottom: '10px' }}
               InputProps={{

                  startAdornment:
                     <InputAdornment position="start">
                        Name:
                     </InputAdornment>,

                  style: { height: 32, fontSize: 14 }
               }}
               error={nameExisted}
               onChange={setWidgetName}
               onBlur={resetWidgetName}
            />

            <TextBox
               placeholder="Content"
               value={(IS_INPUT_WIDGETS(activeWidget)) ? activeWidget.question : activeWidget.value}
               setValue={setWidgetContent}
               sx={{
                  marginBottom: '10px',
                  minHeight: '300px',
                  maxHeight: '300px',
                  overflow: 'auto',
                  fontSize: activeWidget.fontSize,
                  color: activeWidget.fontColor,
                  fontFamily: activeWidget.fontFamily,
                  lineHeight: activeWidget.lineHeight,
                  textAlign: activeWidget.align,
               }}
            />

            <Box sx={{ padding: '5xp 10px 5px 5px', height: '350px', overflowY: 'auto', overflowX: 'hidden' }}>
               {IS_SELECT_WIDGETS(activeWidget) ?
                  <Box
                     sx={{
                        alignItems: 'center',
                        marginBottom: '10px',
                        padding: '0px 10px',
                     }}
                  >
                     <Typography sx={{ mb: 0.5 }}>Options:</Typography>

                     {activeWidget.options.map((opt, index) =>
                        <Box sx={{ mb: 0.5 }} key={opt.key}>
                           <TextField
                              value={opt.value}
                              size="small"
                              sx={{ width: '100%' }}
                              onChange={(event: any) => setWidegetOptions(index, { key: opt.key, value: event.target.value })}
                              InputProps={{
                                 endAdornment:
                                    <IconButton
                                       color='error'
                                       size='small'
                                       onClick={() => deleteWidgetOption(index)}
                                       disabled={activeWidget.options.length <= 1}
                                    >
                                       <DeleteIcon />
                                    </IconButton>
                              }}
                           />
                        </Box>
                     )}
                     <Box sx={{ m: 1 }}>
                        <Button
                           size="small"
                           sx={{ textTransform: 'none', boxShadow: 'none', float: 'right' }}
                           startIcon={<AddIcon />}
                           onClick={() => setWidegetOptions(null, null)}
                        >
                           Add more
                        </Button>
                     </Box>
                  </Box> : <></>
               }

               <Grid
                  container
                  spacing={1}
                  sx={{
                     alignItems: 'center',
                     marginBottom: '10px',
                     padding: '0px 10px',
                     display: HAS_RESPOND_TYPE(activeWidget) ? '' : 'none'
                  }}
               >
                  <Grid item xs={5}>
                     Type:
                  </Grid>
                  <Grid item xs={7}>
                     <GenericSelect
                        value={HAS_RESPOND_TYPE(activeWidget) ? activeWidget.responseType : ''}
                        items={HAS_RESPOND_TYPE(activeWidget) ? GET_RESPOND_TYPE(activeWidget) : []}
                        onChange={setWidgetResponseType}
                     />
                  </Grid>
               </Grid>

               <Grid
                  container
                  spacing={1}
                  sx={{
                     alignItems: 'center',
                     marginBottom: '10px',
                     padding: '0px 10px',
                     display: IS_INPUT_WIDGETS(activeWidget) ? '' : 'none'
                  }}
               >
                  <Grid item xs={5}>
                     <Typography
                        sx={{ fontSize: 16 }}
                     >
                        Required:
                     </Typography>
                  </Grid>
                  <Grid item xs={7}>
                     <Checkbox
                        checked={IS_INPUT_WIDGETS(activeWidget) && activeWidget.require ? activeWidget.require : false}
                        onChange={setWidgetRequired}
                     />
                  </Grid>
               </Grid>

               <Grid container
                  spacing={2}
                  sx={{
                     alignItems: 'center',
                     marginBottom: '10px',
                     padding: '0px 10px',
                     display: HAS_FLEX_COLUMN(activeWidget) ? '' : 'none'
                  }}
               >
                  <Grid item xs={5}>
                     <Typography sx={{ fontSize: 16 }}>
                        Group Column:
                     </Typography>
                  </Grid>
                  <Grid item xs={7}>
                     <TextField
                        value={HAS_FLEX_COLUMN(activeWidget) ? activeWidget.groupColumn : ''}
                        type="number"
                        className={styles.number}
                        InputProps={{
                           style: {
                              height: '20px',
                           }
                        }}
                        inputProps={{
                           maxLength: 4,
                           style: {
                              padding: '5px',
                              maxWidth: '30px'
                           }
                        }}
                        onChange={setWidgetGroupColumn}
                     />
                  </Grid>

               </Grid>

               <Grid container spacing={1} sx={{ alignItems: 'center', marginBottom: '10px', padding: ' 0px 10px' }}>
                  <Grid item xs={5} >
                     <Typography sx={{ fontSize: 16 }}>
                        Align Content:
                     </Typography>
                  </Grid>
                  <Grid item xs={7}>
                     <AligmantSelect onChange={setWidgetJustify} value={activeWidget.justify} />
                  </Grid>

                  <Grid item xs={5} >
                     <Typography sx={{ fontSize: 16 }}>
                        Align Text:
                     </Typography>
                  </Grid>
                  <Grid item xs={7}>
                     <AligmantSelect onChange={setWidgetTextAlignment} value={activeWidget.align} />
                  </Grid>

               </Grid>

               <Grid container spacing={1} sx={{ alignItems: 'center', marginBottom: '10px', padding: ' 0px 10px' }}>
                  <Grid item xs={5} >
                     <Typography sx={{ fontSize: 16 }}>
                        Text color:
                     </Typography>
                  </Grid>
                  <Grid item xs={7}>
                     <IconButton
                        size="small"
                        onClick={(event: any) => { setAnchoFontColor(event.currentTarget); setOpenFontColor(true); }}
                     >
                        <FontDownloadRoundedIcon sx={{ fontSize: 30, color: activeWidget.fontColor }} />
                     </IconButton>
                  </Grid>
               </Grid>

               <Grid container spacing={1} sx={{ alignItems: 'center', marginBottom: '10px', padding: ' 0px 10px' }}>
                  <Grid item xs={5}>
                     <Typography>
                        Font family:
                     </Typography>
                  </Grid>
                  <Grid item xs={7}>
                     <GenericSelect items={FontFamily} value={activeWidget.fontFamily} onChange={setWidgetFontFamily} />
                  </Grid>
                  <Grid item xs={4}>
                     <Typography>
                        Font size:
                     </Typography>
                  </Grid>
                  <Grid item xs={3}>
                     <TextField
                        value={customFontSize === null ? activeWidget.fontSize : customFontSize}
                        InputProps={{
                           style: {
                              height: '20px',
                           }
                        }}
                        inputProps={{
                           maxLength: 4,
                           style: {
                              padding: '5px',
                              maxWidth: '35px'
                           }
                        }}
                        onChange={(event: any) => setCustomFontSize(event.target.value)}
                        onBlur={() => setWidgetFontSize()}
                     />
                  </Grid>
                  <Grid item xs={5}>
                     <Slider
                        value={activeWidget.fontSize}
                        min={10}
                        max={40}
                        valueLabelDisplay="auto"
                        size="medium"
                        onChange={(event: Event, value: number | number[]) => setWidgetFontSize(value.toString())}
                     />
                  </Grid>

                  <Grid item xs={4}>
                     <Typography>
                        Line height:
                     </Typography>
                  </Grid>
                  <Grid item xs={3}>
                     <TextField
                        value={customLineHeight === null ? activeWidget.lineHeight : customLineHeight}
                        InputProps={{
                           style: {
                              height: '20px',
                           }
                        }}
                        inputProps={{
                           maxLength: 4,
                           style: {
                              padding: '5px',
                              maxWidth: '35px'
                           }
                        }}
                        onChange={(event: any) => setCustomLineHeight(event.target.value)}
                        onBlur={() => setWidgetLineHeight()}
                     />
                  </Grid>
                  <Grid item xs={5}>
                     <Slider
                        value={activeWidget.lineHeight}
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        size="medium"
                        onChange={(event: Event, value: number | number[], activeThumb: number) => setWidgetLineHeight(value.toString())}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Typography>
                        Background color:
                     </Typography>
                  </Grid>
                  <Grid item xs={6}>
                     <IconButton>
                        <SquareRoundedIcon sx={{ fontSize: 30 }} />
                     </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                     <Typography>
                        Margin:
                     </Typography>
                  </Grid>
                  <Grid item xs={2}>
                     <TextField
                        value={customMargin === null ? activeWidget.marginTop ? activeWidget.marginTop : 0 : customMargin.top}
                        label="T"
                        variant="outlined"
                        sx={{ height: '20px' }}
                        InputLabelProps={{
                           shrink: true,
                        }}
                        InputProps={{
                           style: {
                              height: '20px',
                           }
                        }}
                        inputProps={{
                           maxLength: 4,
                           style: {
                              padding: '5px',
                              width: '25px'
                           }
                        }}
                        onChange={(event: any) => setCustomMargin(
                           {
                              top: event.target.value as string,
                              right: activeWidget.marginRight.toString(),
                              left: activeWidget.marginLeft.toString(),
                              bottom: activeWidget.marginBottom.toString(),
                           }
                        )}
                        onBlur={setWidgetMargin}
                     />
                  </Grid>
                  <Grid item xs={2}>
                     <TextField
                        value={customMargin === null ? activeWidget.marginRight ? activeWidget.marginRight : 0 : customMargin.right}
                        label="R"
                        variant="outlined"
                        sx={{ height: '20px' }}
                        InputLabelProps={{
                           shrink: true,
                        }}
                        InputProps={{
                           style: {
                              height: '20px',
                           }
                        }}
                        inputProps={{
                           maxLength: 4,
                           style: {
                              padding: '5px',
                              width: '25px'
                           }
                        }}
                        onChange={(event: any) => setCustomMargin(
                           {
                              top: activeWidget.marginTop.toString(),
                              right: event.target.value as string,
                              left: activeWidget.marginLeft.toString(),
                              bottom: activeWidget.marginBottom.toString(),
                           }
                        )}
                        onBlur={setWidgetMargin}
                     />
                  </Grid>
                  <Grid item xs={2}>
                     <TextField
                        value={customMargin === null ? activeWidget.marginBottom ? activeWidget.marginBottom : 0 : customMargin.bottom}
                        variant="outlined"
                        label='B'
                        InputLabelProps={{
                           shrink: true,
                        }}
                        InputProps={{
                           style: {
                              height: '20px',
                           }
                        }}
                        inputProps={{
                           maxLength: 4,
                           style: {
                              padding: '5px',
                              width: '25px'
                           }
                        }}
                        onChange={(event: any) => setCustomMargin(
                           {
                              top: activeWidget.marginTop.toString(),
                              right: activeWidget.marginBottom.toString(),
                              left: activeWidget.marginLeft.toString(),
                              bottom: event.target.value as string
                           }
                        )}
                        onBlur={setWidgetMargin}
                     />
                  </Grid>
                  <Grid item xs={2}>
                     <TextField
                        value={customMargin === null ? activeWidget.marginLeft ? activeWidget.marginLeft : 0 : customMargin.left}
                        variant="outlined"
                        label='L'
                        InputLabelProps={{
                           shrink: true,
                        }}
                        InputProps={{
                           style: {
                              height: '20px',
                           }
                        }}
                        inputProps={{
                           maxLength: 4,
                           style: {
                              padding: '5px',
                              width: '25px'
                           }
                        }}
                        onChange={(event: any) => setCustomMargin(
                           {
                              top: activeWidget.marginTop.toString(),
                              right: activeWidget.marginBottom.toString(),
                              left: event.target.value as string,
                              bottom: activeWidget.marginBottom.toString()
                           }
                        )}
                        onBlur={setWidgetMargin}
                     />
                  </Grid>
               </Grid>
            </Box>

            <Popover
               id={'font-size-id'}
               open={openFontColor}
               anchorEl={anchorFontColor}
               onClose={setWidgetFontColor}
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
         </Box >
      )
   }

   return (
      <Box>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsMenu(!isMenu)}>
               <ListItemIcon>
                  {isMenu ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Menu" />
            </ListItemButton>

            <Collapse in={isMenu} timeout="auto" unmountOnExit>
               <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                     <ListItemIcon>
                        <LinearScaleRoundedIcon />
                     </ListItemIcon>
                     <ListItemText primary="Timeline" />
                  </ListItemButton>
               </List>
            </Collapse>
         </List>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsLayout(!isLayout)}>
               <ListItemIcon>
                  {isLayout ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Layout" />
            </ListItemButton>

            <Collapse in={isLayout} timeout="auto" unmountOnExit>
               <FormGrid />
            </Collapse>
         </List>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsText(!isText)}>
               <ListItemIcon>
                  {isText ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Text" />
            </ListItemButton>
            <Collapse in={isText} timeout="auto" unmountOnExit>
               <TitleText />
               <SubtitleText />
            </Collapse>
         </List>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsInput(!isInput)}>
               <ListItemIcon>
                  {isInput ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Input" />
            </ListItemButton>
            <Collapse in={isInput} timeout="auto" unmountOnExit>
               <TextResponse />
               <DateTime />
               <CheckList />
               <SingleSelect />
               <MultiSelect />
               <Table />
            </Collapse>
         </List>
         <Divider />
      </Box>
   )
}

export default WidgetDrawer