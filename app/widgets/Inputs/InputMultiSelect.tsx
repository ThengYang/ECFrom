import { useState } from "react"
import { Box, TextField, FormControl, MenuItem, Select, Grid, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import { TextBox } from "@/app/components/inputs/texts";
import { WIDGET_TYPE, INPUTMULTISELECT } from "@/app/constants/WigetType"
import WidgetDragPreview from "../WidgetDragPreview"
import WidgetController from "../WidgetController"
import WidgetName from "../WidgetName"
import useOutsideClick from "../WidgetClickOutSideHook"

interface InputMultiSelectProps extends INPUTMULTISELECT {
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: () => void
   setInactive?: () => void
}


const InputMultiSelect = (props: InputMultiSelectProps) => {
   const {
      id,
      parentId,
      type,
      name,
      question,
      answer,
      options,
      fontColor,
      fontSize,
      fontFamily,
      lineHeight,
      align,
      marginBottom,
      marginTop,
      marginLeft,
      marginRight,
      widgetNames,
      setWidgetNames,
      onChange = (widget: WIDGET_TYPE) => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      setActive = () => void 0,
      setInactive = () => void 0,

   } = props

   const [isActve, setIsActive] = useState<boolean>(false)
   const [isHover, setIsHover] = useState<boolean>(false)
   const [showWidget, setShowWidget] = useState<boolean>(true)
   const [isDragging, setIsDragging] = useState<boolean>(false)

   const ref = useOutsideClick((event: any) => {
      if (isActve) {
         const target = event.target as HTMLElement
         if (target.classList.contains("widget")) {
            if (ref && ref.current) ref.current.style.borderColor = '';
            setIsActive(false)
         }
         else {
            const activeWidgetEditor = document.querySelector('#active-widget-editor') as HTMLElement;
            const fontPopper = document.querySelector('#font-size-id') as HTMLElement;
            const fontFamilyPopper = document.querySelector('#font-family-id') as HTMLElement;
            const genericSelectPopper = document.querySelector('#menu-') as HTMLElement;

            if (activeWidgetEditor?.contains(event.target) ||
               fontPopper?.contains(event.target) ||
               fontFamilyPopper?.contains(event.target) ||
               genericSelectPopper?.contains(event.target)) {
            } else {
               setInactive();
               setIsActive(false);
            }
         }
      }
   });

   const handleWidgetNameChanged = (newName: string) => {
      onChange(
         {
            id: id,
            parentId: parentId,
            type: type,
            name: newName,
            question: question,
            answer: answer,
            options: options,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align
         }
      )
   }

   const handleWidgetQuestionChange = (value: string) => {
      onChange(
         {
            id: id,
            parentId: parentId,
            type: type,
            name: name,
            question: value,
            answer: answer,
            options: options,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align
         }
      )
   }

   const handleWidgetAnswerChange = (event: any) => {
      if (event.target.value !== 'none') {
         onChange(
            {
               id: id,
               parentId: parentId,
               type: type,
               name: name,
               question: question,
               answer: [...answer, event.target.value],
               options: options,
               fontColor: fontColor,
               fontSize: fontSize,
               fontFamily: fontFamily,
               lineHeight: lineHeight,
               align: align
            }
         )
      }
   }

   const handleWidgetRemoveAnswer = (index: number) => {
      onChange(
         {
            id: id,
            parentId: parentId,
            type: type,
            name: name,
            question: question,
            answer: answer.filter((_, indx) => indx !== index),
            options: options,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align
         }
      )
   }

   return (
      <Box
         sx={{
            border: isActve ? '1px solid #03a9f4' : '0px',
            '&:hover': { border: '1px solid #03a9f4' },
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight
         }}
         ref={ref}
      >
         <WidgetDragPreview isDragging={isDragging} id={id} />
         <Box
            sx={{
               margin: '1em',
               display: showWidget ? '' : 'none'
            }}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
         >
            <WidgetController
               visible={isHover || isActve}
               onAdd={onAdd}
               onDelete={onDelete}
               id={id}
               parentId={parentId}
               onDrag={() => { setShowWidget(false); setIsDragging(true) }}
               onDragEnd={() => { setShowWidget(true); setIsDragging(false) }}

            />
            <WidgetName
               visible={isHover || isActve}
               value={name}
               id={id}
               setValue={handleWidgetNameChanged}
               widgetNames={widgetNames}
               setWidgetNames={setWidgetNames}
               onFocus={() => { setActive(); setIsActive(true) }}
            />
            <TextBox
               placeholder={'Question'}
               value={question}
               minRows={1}
               setValue={handleWidgetQuestionChange}
               onFocus={() => { setActive(); setIsActive(true) }}
               sx={{
                  fontSize: fontSize,
                  color: fontColor,
                  textAlign: align,
                  fontFamily: fontFamily,
                  lineHeight: lineHeight,
               }}
               className="widget"
            />

            <FormControl sx={{ mt: 0.5, width: '100%' }} size="small">
               <Select
                  value={'none'}
                  onChange={handleWidgetAnswerChange}
                  sx={{ borderRadius: 0 }}
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
                  justifyContent: 'center'
               }}
            >
               {answer.map((ans, indx) =>
                  <Grid item key={indx} sx={{ m: 1 }}>
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
                                 onClick={() => handleWidgetRemoveAnswer(indx)}
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
      </Box>
   )
}

export default InputMultiSelect