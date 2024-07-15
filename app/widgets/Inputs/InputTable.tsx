import { useEffect } from "react";
import { WIDGET_TYPE, INPUTTABLE } from "@/app/constants/WigetType"
import WidgetBase from "../WidgetBase";
import Table from "@/app/components/inputs/table/Table";
import GenerateWidget from "@/app/components/generators/GenerateWidget";
import initialize from "../widgetInitializer";



interface InputTableProps {
   widget: INPUTTABLE
   getWidget: (id: string) => WIDGET_TYPE | null | undefined
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
   onChange?: Function
   updateSubItems?: Function
   onAdd?: Function
   onDelete?: Function
   setActive?: (widgetID: string | null | undefined) => void
   setInactive?: () => void
}

const InputTable = (props: InputTableProps) => {
   const {
      widget,
      getWidget,
      widgetNames,
      setWidgetNames,
      handleWidgetCondition,
      onChange = (widget: WIDGET_TYPE) => void 0,
      updateSubItems = () => void 0,
      onAdd = () => void 0,
      onDelete = () => void 0,
      setActive = () => void 0,
      setInactive = () => void 0,

   } = props

   const setRowValue = () => {
      if (widget.setValue) {
         const newRow = [...widget.row]
         for (const col of newRow) {
            for (const item of widget.setValue) {
               if (item.target && item.code) {
                  const test = handleWidgetCondition('set value', item.code)

                  const testEc = new Function('widget, idx', test)
                  const val = testEc(widget, widget.row.indexOf(col))
                  col[item.target] = val
               }
            }
         }
         return newRow
      }
      return undefined
   }

   useEffect(() => {
      const newRow = setRowValue()
      if (newRow) handleWidgetAnswerChange(newRow)

   }, [widget.setValue])

   const handleWidgetAnswerChange = (newRow: Array<{ id: number, [key: string]: any }>) => {
      onChange(
         {
            ...widget,
            row: newRow,
         }
      )
   }

   const addFooter = (widgetType: string) => {

      const { newWidget, newWidgetNames } = initialize(widget.id, widgetType, widgetNames);
      console.log("New Footer", newWidget)
      if (newWidget.id !== '-1') {
         onChange({
            ...widget,
            footer: newWidget.id
         })
         onChange(newWidget)
         setWidgetNames(newWidgetNames)
      }
   }

   const updateFooter = (newWdiget: WIDGET_TYPE) => {
      updateSubItems(newWdiget)
   }

   const deleteFooter = () => {
      let tempWidgetNames = widgetNames
      delete tempWidgetNames[widget.footer];

      tempWidgetNames.length -= 1;
      onChange({
         id: widget.footer,
         parentId: widget.id,
         type: 'new-section',
         name: ''
      })
      setWidgetNames(tempWidgetNames)
   }

   const setFooterActive = (widgetID: string | null | undefined) => {
      if (widgetID) {
         setActive(widgetID)
      }
      else {
         setActive(widget.footer)
      }
   }

   setRowValue()
   return (
      <WidgetBase
         widget={widget}
         handleWidgetCondition={handleWidgetCondition}
         widgetNames={widgetNames}
         setWidgetNames={setWidgetNames}
         onChange={onChange}
         onAdd={onAdd}
         onDelete={onDelete}
         setActive={setActive}
         setInactive={setInactive}
      >
         <Table
            column={widget.column}
            row={widget.row}
            setValue={handleWidgetAnswerChange}
            makeFooter={() =>
               <GenerateWidget
                  widget={getWidget(widget.footer)}
                  handleWidgetCondition={handleWidgetCondition}
                  setWidgetNames={setWidgetNames}
                  onDelete={deleteFooter}
                  onAdd={(id: number, itemType: string) => addFooter(itemType)}
                  onChange={(newItem: WIDGET_TYPE) => updateFooter(newItem)}
                  widgetNames={widgetNames}
                  setActive={setFooterActive}
                  setInactive={setInactive}
               />
            }
         />
      </WidgetBase>
   )
}

export default InputTable