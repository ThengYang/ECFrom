
import { WIDGET_TYPE, FORMGRID } from "@/app/constants/WigetType"
import { Grid, Box } from "@mui/material"
import GenerateViews from "@/app/components/generators/GenerateViews"

interface LayoutGridProps {
   widget: FORMGRID
   getWidget: (id: string) => WIDGET_TYPE | null | undefined
   updateWidget?: (widget: WIDGET_TYPE) => void
   handleWidgetCondition: (parseEvent: string, data: any) => any
}

const LayoutGrid = (props: LayoutGridProps) => {

   const {
      widget,
      getWidget,
      updateWidget = () => void 0,
      handleWidgetCondition
   } = props

   const handleUpdateWidget = (newWidget: WIDGET_TYPE, row: number, column: number) => {

      updateWidget(newWidget)
   }

   const isVisible = widget.visibility?.conditional ?
      handleWidgetCondition('visibility', widget.visibility) :
      widget.visibility?.action === 'hidden' ? false : true

   return (
      <Box
         sx={{
            display: isVisible ? '' : 'none',
            backgroundColor: widget.backgroundColor,
            color: widget.fontColor,
            fontFamily: widget.fontFamily,
            fontStyle: widget.fontStyle,
            fontSize: widget.fontSize,
            fontWeight: widget.fontWeight,
            lineHeight: widget.lineHeight,
            letterSpacing: widget.letterSpacing,
            textAlign: widget.align,
            justifyContent: widget.justify,
            marginTop: widget.marginTop,
            marginBottom: widget.marginBottom,
            marginLeft: widget.marginLeft,
            marginRight: widget.marginRight,
            paddingTop: widget.paddingTop,
            paddingBottom: widget.paddingBottom,
            paddingRight: widget.paddingRight,
            paddingLeft: widget.paddingLeft,
         }}
      >
         {Array.from({ length: widget.row }, (_, ii) => (
            <Grid container spacing={2} key={ii}>
               {Array.from({ length: widget.column }, (_, jj) => (
                  <Grid item key={jj} xs={12 / widget.column} >
                     <GenerateViews
                        widget={getWidget(widget.items[ii][jj])}
                        getWidget={getWidget}
                        updateWidget={(newItem: WIDGET_TYPE) => handleUpdateWidget(newItem, ii, jj)}
                        handleWidgetCondition={handleWidgetCondition}
                     />
                  </Grid>
               ))}
            </Grid>
         ))}
      </Box>
   )
}

export default LayoutGrid