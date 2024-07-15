
import { Box } from "@mui/material"
import { WIDGET_TYPE } from "../constants/WigetType";

import GenerateViews from "../components/generators/GenerateViews";

interface PreviewProps {
   widgetOrder: Array<string>
   getWidget: (id: string) => WIDGET_TYPE | undefined | null
   updateWidget?: (widget: WIDGET_TYPE) => void
   handleWidgetCondition: (event: string, widget: WIDGET_TYPE) => void
}

const Preview = (props: PreviewProps) => {
   const {
      widgetOrder,
      getWidget,
      handleWidgetCondition,
      updateWidget = () => void 0
   } = props
   return (
      <Box className="h-screen  items-center w-4/5 px-10" sx={{ margin: 'auto' }}>
         {widgetOrder.map(widgetID =>
            <GenerateViews
               widget={getWidget(widgetID)}
               getWidget={getWidget}
               updateWidget={updateWidget}
               key={widgetID}
               handleWidgetCondition={handleWidgetCondition} />
         )}
      </Box>
   )
}

export default Preview