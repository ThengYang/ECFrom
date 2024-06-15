"use client"

import { useState } from "react";
import { Box, ThemeProvider } from "@mui/material";

import WidgetController from "../WidgetController";
import WidgetDragPreview from "../WidgetDragPreview";
import BaseTheme from "@/app/themes/BaseTheme";
import { TextBox } from "@/app/components/inputs/texts";
import { TEXT } from "@/app/constants/WigetType";
import WidgetName from "../WidgetName";
import useOutsideClick from "../WidgetClickOutSideHook";


interface FormTextProps extends TEXT {
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: () => void
   setInactive?: () => void
}

const TitleText = (props: FormTextProps) => {

   const {
      id,
      parentId,
      type,
      name,
      value = 'Add your text here',
      fontSize = 18,
      fontColor = '#000000',
      fontFamily,
      lineHeight,
      align = 'left',
      marginTop = 0,
      marginRight = 0,
      marginLeft = 0,
      marginBottom = 0,
      onChange = () => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      widgetNames,
      setWidgetNames,
      setActive = () => void 0,
      setInactive = () => void 0,
   } = props

   const [showController, setShowController] = useState<boolean>(false)
   const [showWidget, setShowWidget] = useState<boolean>(true)
   const [isDragging, setIsDragging] = useState<boolean>(false)
   const [isActve, setIsActive] = useState<boolean>(false)

   const ref = useOutsideClick((event: any) => {
      if (isActve) {
         const target = event.target as HTMLElement
         if (target.classList.contains("widget")) {
            if (ref && ref.current) ref.current.style.borderColor = '';
            setIsActive(false);
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


   const handleWidgetNameChange = (newName: string) => {
      onChange(
         {
            id: id,
            parentId: parentId,
            name: newName,
            type: type,
            value: value,
            fontSize: fontSize,
            fontColor: fontColor,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align,
         }
      )
   }
   const handleWidgetValueChange = (value: string) => {
      onChange(
         {
            id: id,
            parentId: parentId,
            name: name,
            type: type,
            value: value,
            fontSize: fontSize,
            fontColor: fontColor,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            align: align,
         }
      )
   }

   const handleDragEnd = () => {
      setIsDragging(false)
      setShowWidget(true)
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
         onMouseOver={() => setShowController(true)}
         onMouseLeave={() => setShowController(false)}
         ref={ref}
      >
         <WidgetDragPreview isDragging={isDragging} id={id} />

         <Box
            sx={{
               margin: '1em',
               display: showWidget ? '' : 'none'
            }}
         >
            <ThemeProvider theme={BaseTheme}>
               <WidgetController
                  visible={showController || isActve}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onDrag={() => { setShowWidget(false); setIsDragging(true) }}
                  onDragEnd={handleDragEnd}
                  id={id}
                  parentId={parentId}
               />
               <WidgetName
                  value={name}
                  id={id}
                  setValue={handleWidgetNameChange}
                  visible={showController || isActve}
                  widgetNames={widgetNames}
                  setWidgetNames={setWidgetNames}
                  onFocus={() => { setActive(); setIsActive(true) }}
               />

               <TextBox
                  placeholder={'Question'}
                  value={value}
                  minRows={1}
                  setValue={handleWidgetValueChange}
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

            </ThemeProvider>
         </Box>
      </Box >
   )
}


export default TitleText;