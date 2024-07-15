import { ReactNode, useState } from "react";

import { Box, Divider, Grid, IconButton, Stack } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { IS_INPUTTEXT, WIDGET_FILL } from "../constants/WigetType";
import { TextBox, TextLine } from "../components/inputs/texts";

import useOutsideClick from "./WidgetClickOutSideHook"
import WidgetDragPreview from "./WidgetDragPreview"
import WidgetController from "./WidgetController"
import WidgetName from "./WidgetName"

interface WidgetBaseProps {
   widget: WIDGET_FILL
   children?: ReactNode
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: (widgetID: string | null | undefined) => void
   setInactive?: () => void
   handleWidgetCondition: (parseEvent: string, data: any) => any,
}

const WidgetBase = (props: WidgetBaseProps) => {
   const {
      widget,
      children,
      widgetNames,
      setWidgetNames,
      handleWidgetCondition,
      onChange = (widget: WIDGET_FILL) => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      setActive = () => void 0,
      setInactive = () => void 0,
   } = props;

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

   const handleAddWidget = () => {
      onAdd(widget.id)
   }

   const handleDeleteWidget = () => {
      onDelete(widget.id)
      setInactive()
   }

   const handleWidgetNameChanged = (newName: string) => {
      onChange(
         {
            ...widget,
            name: newName,
         }
      )
   }

   const handleWidgetQuestionChange = (value: string) => {
      onChange(
         {
            ...widget,
            question: value,
         }
      )
   }

   const isVisible = widget.visibility?.conditional ?
      handleWidgetCondition('visibility', widget.visibility) :
      widget.visibility?.action === 'hidden' ? false : true

   return (
      <Box
         sx={{
            marginBottom: widget.marginBottom,
            marginTop: widget.marginTop,
            marginLeft: widget.marginLeft,
            marginRight: widget.marginRight,
            paddingTop: widget.paddingTop,
            paddingBottom: widget.paddingBottom,
            paddingLeft: widget.paddingLeft,
            paddingRight: widget.paddingRight,
            backgroundColor: widget.backgroundColor,
            border: isActve ? '1px solid #03a9f4' : '0px',
            '&:hover': { border: '1px solid #03a9f4' },
         }}
         ref={ref}
      >
         <WidgetDragPreview isDragging={isDragging} id={widget.id} />
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
               onAdd={handleAddWidget}
               onDelete={handleDeleteWidget}
               id={widget.id}
               parentId={widget.parentId}
               onDrag={() => { setShowWidget(false); setIsDragging(true) }}
               onDragEnd={() => { setShowWidget(true); setIsDragging(false) }}
            />
            <Box className="grid-section">
               <Divider sx={{ display: isVisible ? 'none' : '' }} className="grid-section">
                  <IconButton
                     size="small"
                     disableRipple
                     className="grid-section"
                  >
                     <VisibilityOffIcon className="grid-section" />
                  </IconButton>
               </Divider>
            </Box>
            <Box sx={{ display: isVisible ? '' : 'none' }}>
               <WidgetName
                  visible={isHover || isActve}
                  value={widget.name}
                  id={widget.id}
                  type={widget.type}
                  setValue={handleWidgetNameChanged}
                  widgetNames={widgetNames}
                  setWidgetNames={setWidgetNames}
                  onFocus={() => { setActive(widget.id); setIsActive(true) }}
               />
               {IS_INPUTTEXT(widget) && widget.variant === 'inline' ?
                  <Stack spacing={{ xs: 1 }} direction="row">
                     <TextLine
                        placeholder={'Content'}
                        value={widget.question}
                        setValue={handleWidgetQuestionChange}
                        onFocus={() => { setActive(widget.id); setIsActive(true) }}
                        sx={{
                           fontSize: widget.fontSize,
                           fontFamily: widget.fontFamily,
                           fontStyle: widget.fontStyle,
                           fontWeight: widget.fontWeight,
                           color: widget.fontColor,
                           textAlign: widget.align,
                           lineHeight: widget.lineHeight,
                           letterSpacing: widget.letterSpacing,
                           width: widget.width ? widget.width : '100%'
                        }}

                        className="widget"
                     />
                     {children}
                  </Stack> :
                  <Box>
                     <TextBox
                        placeholder={'Content'}
                        value={widget.question}
                        minRows={1}
                        setValue={handleWidgetQuestionChange}
                        onFocus={() => { setActive(widget.id); setIsActive(true) }}
                        sx={{
                           fontSize: widget.fontSize,
                           fontFamily: widget.fontFamily,
                           fontStyle: widget.fontStyle,
                           fontWeight: widget.fontWeight,
                           color: widget.fontColor,
                           textAlign: widget.align,
                           lineHeight: widget.lineHeight,
                           letterSpacing: widget.letterSpacing
                        }}
                        className="widget"
                     />
                     {children}
                  </Box>
               }
            </Box>
         </Box>
      </Box>
   )
}

export default WidgetBase