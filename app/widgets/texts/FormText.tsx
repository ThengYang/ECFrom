"use client"

import { useState } from "react";
import { TEXT } from "@/app/constants/WigetType";
import useOutsideClick from "../WidgetClickOutSideHook";
import WidgetBase from "../WidgetBase";

interface FormTextProps {
   widget: TEXT,
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: (id: string | null | undefined) => void
   setInactive?: () => void
   handleWidgetCondition: (parseEvent: string, data: any) => any,
}

const TitleText = (props: FormTextProps) => {

   const {
      widget,
      onChange = () => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      widgetNames,
      setWidgetNames,
      handleWidgetCondition,
      setActive = () => void 0,
      setInactive = () => void 0,
   } = props

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

   return (
      <WidgetBase widget={widget}
         handleWidgetCondition={handleWidgetCondition}
         widgetNames={widgetNames}
         setWidgetNames={setWidgetNames}
         onChange={onChange}
         onAdd={onAdd}
         onDelete={onDelete}
         setActive={(id: string | null | undefined) => { console.log(id); setActive(id) }}
         setInactive={setInactive}
      />
   )
}


export default TitleText;