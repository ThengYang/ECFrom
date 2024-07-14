
import { Box } from "@mui/material"
import { WIDGET_TYPE } from "../constants/WigetType";

import GenerateViews from "../components/generators/GenerateViews";

interface PreviewProps {
   widgets: Array<WIDGET_TYPE>
   updateWidget?: (widget: WIDGET_TYPE) => void
   handleWidgetCondition: (event: string, widget: WIDGET_TYPE) => void
}

const Preview = (props: PreviewProps) => {
   const {
      widgets,
      handleWidgetCondition,
      updateWidget = () => void 0
   } = props
   return (
      <Box className="h-screen  items-center w-4/5 px-10" sx={{ margin: 'auto' }}>
         {widgets.map((item) =>
            <GenerateViews widget={item} updateWidget={updateWidget} key={item.id} handleWidgetCondition={handleWidgetCondition} />
         )}
      </Box>
   )
}

export default Preview