import { useState } from "react"
import { Box, TextField } from "@mui/material"

import { INPUTTEXT, WIDGET_TYPE } from "@/app/constants/WigetType"
import { TextBox, TextLine } from "@/app/components/inputs/texts";
import WidgetController from "../WidgetController";
import WidgetName from "../WidgetName";
import useOutsideClick from "../WidgetClickOutSideHook";
import WidgetDragPreview from "../WidgetDragPreview";

interface InputTextProps extends INPUTTEXT {
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: () => void
   setInactive?: () => void
}

const InputText = (props: InputTextProps) => {

   const {
      id,
      parentId,
      type,
      name,
      question,
      answer,
      fontColor,
      fontSize,
      fontFamily,
      lineHeight,
      align,
      marginBottom,
      marginTop,
      marginLeft,
      marginRight,
      responseType,
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
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align,
            responseType: responseType,
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
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align,
            responseType: responseType,
         }
      )
   }

   const handleWidgetAnswerChange = (value: string) => {
      onChange(
         {
            id: id,
            parentId: parentId,
            type: type,
            name: name,
            question: question,
            answer: value,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align,
            responseType: responseType,
         }
      )
   }


   function isTextLine(responseType: any): responseType is "text" | 'number' | 'phone' | 'email' {
      return (
         responseType === "short answer" ||
         responseType === "number" ||
         responseType === "phone" ||
         responseType === 'email'
      );
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
            {isTextLine(responseType) ?
               <TextLine
                  value={answer}
                  type={responseType}
                  setValue={handleWidgetAnswerChange}
                  sx={{ width: '100%', mt: 0.5 }}
               /> : (responseType === 'paragraph') ?
                  <TextBox
                     value={answer}
                     setValue={handleWidgetAnswerChange}
                     minRows={3}
                     sx={{ width: '100%', mt: 0.5 }}
                  />
                  : <></>
            }

         </Box>
      </Box>
   )
}

export default InputText