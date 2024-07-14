import { Box, Typography } from "@mui/material"

import GenericSelect from "@/app/components/inputs/Selects"
import GenericTab from "../../tabs/GenericTab"

import { WIDGET_RESPVAR, GET_RESPOND_TYPE, WIDGET_FILL } from "@/app/constants/WigetType"

interface WidgetResponseOptionsProps {
   activeWidget: WIDGET_RESPVAR,
   updateWidget: (widget: WIDGET_RESPVAR) => void
}

const WidgetResponseTypeOptions = (props: WidgetResponseOptionsProps) => {

   const { activeWidget, updateWidget } = props

   const setWidgetResponseType = (value: string) => {
      updateWidget({
         ...activeWidget,
         responseType: value as any
      })
   }

   return (
      <Box sx={{ mb: 1 }}>
         <Typography sx={{ mb: 1 }}>Answer type</Typography>
         <GenericSelect
            value={activeWidget.responseType}
            items={GET_RESPOND_TYPE(activeWidget)}
            onChange={setWidgetResponseType}
            sx={{ borderRadius: 0 }}
         />
      </Box>
   )
}

interface WidgetResponseRequiredOptionsProps {
   activeWidget: WIDGET_FILL,
   updateWidget: (widget: WIDGET_FILL) => void
}
const WidgetResponseRequiredOptions = (props: WidgetResponseRequiredOptionsProps) => {

   const { activeWidget, updateWidget } = props

   const setWidgetResponseRequired = (value: number) => {
      updateWidget({
         ...activeWidget,
         require: value === 1
      })
   }

   return (
      <Box sx={{ mb: 1 }}>
         <Typography sx={{ mb: 1 }}>Answer is</Typography>
         <GenericTab
            activeTab={activeWidget.require ? 1 : 0}
            tabs={['Optional', 'Required']}
            variant='filled'
            onChange={setWidgetResponseRequired}
         />
      </Box>
   )

}

export { WidgetResponseTypeOptions, WidgetResponseRequiredOptions }