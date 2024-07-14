import { INPUTTABLE } from "@/app/constants/WigetType"
import ViewBase from "../ViewBase"
import Table from "@/app/components/inputs/table/Table"
import GenerateViews from "@/app/components/generators/GenerateViews"

interface InputTableProps {
   widget: INPUTTABLE,
   handleWidgetCondition: (parseEvent: string, data: any) => any
   updateWidget?: (widget: INPUTTABLE) => void

}

const InputTable = (props: InputTableProps) => {
   const { widget, handleWidgetCondition, updateWidget = () => void 0 } = props

   const setWidgetAnswer = (newRow: Array<{ id: number, [key: string]: any }>) => {
      updateWidget({
         ...widget,
         row: newRow
      })
   }

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
      }
   }

   setRowValue()

   return (
      <ViewBase
         widget={widget}
         handleWidgetCondition={handleWidgetCondition}
      >
         <Table
            column={widget.column}
            row={widget.row}
            setValue={setWidgetAnswer}
            makeFooter={() =>
               <GenerateViews
                  widget={widget.footer}
                  handleWidgetCondition={handleWidgetCondition}

               />
            }
         />
      </ViewBase>
   )
}

export default InputTable
