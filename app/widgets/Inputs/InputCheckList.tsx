import { useState } from "react"
import { Box, FormControl, FormControlLabel, Checkbox, RadioGroup, Radio, } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import { TextBox } from "@/app/components/inputs/texts";
import { WIDGET_TYPE, INPUTCHECKLIST } from "@/app/constants/WigetType"
import WidgetDragPreview from "../WidgetDragPreview"
import WidgetController from "../WidgetController"
import WidgetName from "../WidgetName"
import useOutsideClick from "../WidgetClickOutSideHook"

interface InputCheckListProps extends INPUTCHECKLIST {
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: () => void
   setInactive?: () => void
}


const InputCheckList = (props: InputCheckListProps) => {
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
      responseType,
      require,
      groupColumn,
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
            align: align,
            groupColumn: groupColumn,
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
            align: align,
            require: require,
            responseType: responseType,
            groupColumn: groupColumn,
         }
      )
   }

   const handleWidgetAnswerChange = (event: any) => {

      if (event.target.value !== 'none') {
         const newAnswer = responseType === 'radio' ? [event.target.value] :
            answer.includes(event.target.value) ? answer.filter(item => item !== event.target.value) :
               [...answer, event.target.value];

         onChange(
            {
               id: id,
               parentId: parentId,
               type: type,
               name: name,
               question: question,
               answer: newAnswer,
               options: options,
               fontColor: fontColor,
               fontSize: fontSize,
               fontFamily: fontFamily,
               lineHeight: lineHeight,
               align: align,
               require: require,
               responseType: responseType,
               groupColumn: groupColumn,
            }
         )
      }
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
            <FormControl sx={{ ml: 1 }}>
               <RadioGroup onChange={handleWidgetAnswerChange} row={groupColumn > 0}>
                  {options.map(option =>
                     <FormControlLabel
                        key={option.key}
                        value={option.value}
                        control={
                           responseType === 'radio' ? <Radio /> :
                              <Checkbox onChange={handleWidgetAnswerChange} />
                        }
                        label={option.value}
                        checked={answer.includes(option.value)}
                     />
                  )}
               </RadioGroup>
            </FormControl>
         </Box>
      </Box>
   )
}

export default InputCheckList