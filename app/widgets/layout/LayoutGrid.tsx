

import { useState } from "react";

import { Grid, Box, IconButton, Divider } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { WIDGET_TYPE, FORMGRID } from "@/app/constants/WigetType";
import useOutsideClick from "../WidgetClickOutSideHook";
import WidgetDragPreview from "../WidgetDragPreview";
import GenerateWidget from "@/app/components/generators/GenerateWidget";
import WidgetController from "../WidgetController";
import WidgetDrogPad from "../WidgetDropPad";
import initialize from "../widgetInitializer";

interface FormGridProps {
   widget: FORMGRID
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   updateSubItems?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: (item: WIDGET_TYPE | null) => void
   setInactive?: () => void
   handleWidgetCondition?: (parseEvent: string, data: any) => any
}
const FormGrid = (props: FormGridProps) => {
   const {
      widget,
      onAdd = () => void 0,
      onDelete = () => void 0,
      updateSubItems = () => void 0,
      widgetNames,
      setWidgetNames,
      setActive = () => void 0,
      setInactive = () => void 0,
      handleWidgetCondition = () => void 0
   } = props

   const [isActve, setIsActive] = useState<boolean>(false)
   const [showController, setShowController] = useState<boolean>(false)
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

   const updateItem = (rowIndex: number, colIndex: number, newItem: WIDGET_TYPE) => {
      let updatedItems = [...widget.items]
      updatedItems[rowIndex][colIndex] = newItem

      updateSubItems({ ...widget, items: updatedItems })
      setActive(newItem)
   }

   const addItem = (rowIndex: number, colIndex: number, itemType: string) => {
      const { newWidget, newWidgetNames } = initialize(widget.id, itemType, widgetNames);
      if (newWidget.id !== '-1') {
         let updateItems = [...widget.items]
         updateItems[rowIndex][colIndex] = newWidget
         updateSubItems(updateItems)
      }
      setWidgetNames(newWidgetNames)
   }

   const deleteItem = (rowIndex: number, colIndex: number) => {
      let updatedItems = [...widget.items]
      let tempWidgetNames = widgetNames
      delete tempWidgetNames[updatedItems[rowIndex][colIndex].name];
      tempWidgetNames.length -= 1;

      updatedItems[rowIndex][colIndex] = {
         id: updatedItems[rowIndex][colIndex].id as string,
         parentId: widget.items[rowIndex][colIndex].parentId as string,
         type: 'new-section',
         name: ''
      }

      updateSubItems(updatedItems)
      setWidgetNames(tempWidgetNames)
   }

   const moveItem = (sourceId: string, targetId: string) => {
      let sourceIndices = [-1, -1]
      let targetIndices = [-1, -1]

      let updatedItems = [...widget.items]

      for (let ii = 0; ii < widget.items.length; ii++) {
         const sourceCol = widget.items[ii].findIndex(item => item.id === sourceId)
         const targetCol = widget.items[ii].findIndex(item => item.id === targetId)

         if (sourceCol > -1) {
            sourceIndices = [ii, sourceCol]
         }
         if (targetCol > -1) {
            targetIndices = [ii, targetCol]
         }

         if (sourceIndices[1] > -1 && targetIndices[1] > -1) {
            const sourceWidget = updatedItems[sourceIndices[0]][sourceIndices[1]]
            updatedItems[sourceIndices[0]][sourceIndices[1]] = updatedItems[targetIndices[0]][targetIndices[1]]
            updatedItems[targetIndices[0]][targetIndices[1]] = sourceWidget
            updateSubItems(updatedItems)
            break;
         }
      }
   }

   const handleBoxClick = (event: any) => {

      if (event.target.classList.contains('grid-section') || event.target.classList.contains('form-section')) {
         console.log("Grid clicked", event.target)
         setActive(null);
         setIsActive(true);
      }
   }

   const isVisible = widget.visibility?.conditional ?
      handleWidgetCondition('visibility', widget.visibility) :
      widget.visibility?.action === 'hidden' ? false : true

   return (
      <Box sx={{ position: 'relative', marginBottom: '2em' }}>
         <WidgetDragPreview isDragging={isDragging} id={widget.id} onAdd={onAdd} />
         <Box
            sx={{
               backgroundColor: widget.backgroundColor,
               color: widget.fontColor,
               fontFamily: widget.fontFamily,
               fontStyle: widget.fontStyle,
               fontSize: widget.fontSize,
               lineHeight: widget.lineHeight,
               fontWeight: widget.fontWeight,
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
               display: showWidget ? '' : 'none',
               border: isActve ? '1px solid #03a9f4' : '0px',
               '&:hover': { border: '1px solid #03a9f4' },
            }}
            onMouseOver={() => setShowController(true)}
            onMouseLeave={() => setShowController(false)}
            onClick={handleBoxClick}
            ref={ref}
         >
            <WidgetController
               visible={showController}
               onAdd={onAdd}
               onDelete={onDelete}
               onDrag={() => { setShowWidget(false); setIsDragging(true) }}
               onDragEnd={() => { setShowWidget(true); setIsDragging(false) }}
               id={widget.id}
               parentId={widget.parentId}
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
               {Array.from({ length: widget.row }, (_, ii) => (
                  <Grid container spacing={2} key={ii}>
                     {Array.from({ length: widget.column }, (_, jj) => (
                        <Grid item key={jj} xs={12 / widget.column} className="grid-section" >
                           <WidgetDrogPad
                              widgets={widget.items}
                              key={widget.items[ii][jj].id}
                              targetId={widget.items[ii][jj].id}
                              onDrop={moveItem}
                              variant="swap"
                              parent={widget.id}
                           >
                              <GenerateWidget
                                 item={widget.items[ii][jj]}
                                 onDelete={() => deleteItem(ii, jj)}
                                 onAdd={(id: number, itemType: string) => addItem(ii, jj, itemType)}
                                 onChange={(newItem: WIDGET_TYPE) => updateItem(ii, jj, newItem)}
                                 widgetNames={widgetNames}
                                 setWidgetNames={setWidgetNames}
                                 setActive={() => setActive(widget.items[ii][jj])}
                                 setInactive={setInactive}
                                 handleWidgetCondition={handleWidgetCondition}
                                 newSectionExclude="grid"
                              />
                           </WidgetDrogPad>
                        </Grid>
                     ))}
                  </Grid>
               ))}
            </Box>
         </Box>
      </Box>
   )
}

export default FormGrid