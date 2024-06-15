

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Grid, Box, IconButton, Tooltip } from "@mui/material";
import { FORMGRID } from "@/app/constants/WigetType";

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { WIDGET_TYPE } from "@/app/constants/WigetType";
import WidgetDragPreview from "../WidgetDragPreview";
import GenerateWidget from "@/app/components/generators/GenerateWidget";
import WidgetController from "../WidgetController";
import WidgetDrogPad from "../WidgetDropPad";
import initialize from "../widgetInitializer";


interface FormGridProps extends FORMGRID {
   onChange?: Function
   onAdd?: Function
   onDelete?: Function
   updateSubItems?: Function
   widgetNames: { [key: string]: any }
   setWidgetNames: (item: { [key: string]: any }) => void
   setActive?: (item: WIDGET_TYPE | null) => void
   setInactive?: () => void
}
const FormGrid = (props: FormGridProps) => {
   const {
      id,
      parentId,
      type,
      name,
      row,
      column,
      items,
      onAdd = () => void 0,
      onDelete = () => void 0,
      updateSubItems = () => void 0,
      widgetNames,
      setWidgetNames,
      setActive = () => void 0,
      setInactive = () => void 0,
   } = props

   const [showController, setShowController] = useState<boolean>(false)
   const [showWidget, setShowWidget] = useState<boolean>(true)
   const [isDragging, setIsDragging] = useState<boolean>(false)

   const addColumn = () => {
      const tempItems = [...items]
      for (const ite of tempItems) {
         ite.push(
            {
               id: uuidv4(),
               parentId: id,
               type: 'new-section',
               name: ''
            }
         )
      }

      const updatedWiget = {
         id: id,
         type: type,
         name: name,
         items: tempItems,
         column: column + 1,
         row: row
      }
      updateSubItems(updatedWiget)
   }

   const addRow = () => {

      const tempItems = [...items]
      tempItems.push(
         new Array(column).fill(
            {
               id: uuidv4(),
               parentId: id,
               type: 'new-section'
            }
         )
      )

      const updatedWiget = {
         id: id,
         type: type,
         name: name,
         items: tempItems,
         column: column,
         row: row + 1
      }
      updateSubItems(updatedWiget)
   }

   const updateItem = (rowIndex: number, colIndex: number, newItem: WIDGET_TYPE) => {
      let updatedItems = [...items]
      updatedItems[rowIndex][colIndex] = newItem
      updateSubItems(updatedItems)
      setActive(newItem)
   }
   const addItem = (rowIndex: number, colIndex: number, itemType: string) => {
      const { widget, names } = initialize(id, itemType, widgetNames);

      if (widget.id !== '-1') {
         let updateItems = [...items]
         updateItems[rowIndex][colIndex] = widget
         updateSubItems(updateItems)
      }
      setWidgetNames(names)
   }

   const deleteItem = (rowIndex: number, colIndex: number) => {
      let updatedItems = [...items]
      let tempWidgetNames = widgetNames
      delete tempWidgetNames[updatedItems[rowIndex][colIndex].name];
      tempWidgetNames.length -= 1;

      updatedItems[rowIndex][colIndex] = {
         id: updatedItems[rowIndex][colIndex].id as string,
         parentId: items[rowIndex][colIndex].parentId as string,
         type: 'new-section',
         name: ''
      }

      updateSubItems(updatedItems)
      setWidgetNames(tempWidgetNames)
   }

   const moveItem = (sourceId: string, targetId: string) => {
      let sourceIndices = [-1, -1]
      let targetIndices = [-1, -1]

      let updatedItems = [...items]

      for (let ii = 0; ii < items.length; ii++) {
         const sourceCol = items[ii].findIndex(item => item.id === sourceId)
         const targetCol = items[ii].findIndex(item => item.id === targetId)

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

            break
         }
      }
   }

   return (
      <Box sx={{ position: 'relative', marginBottom: '2em' }}>

         <WidgetDragPreview isDragging={isDragging} id={id} onAdd={onAdd} />
         <Box onMouseOver={() => setShowController(true)}
            onMouseLeave={() => setShowController(false)}
            sx={{
               width: '100%',
               margin: 'auto',
               display: showWidget ? '' : 'none',
               '&:hover': { border: '1px solid #03a9f4' }
            }}
         >
            <WidgetController
               visible={showController}
               onAdd={onAdd}
               onDelete={onDelete}
               onDrag={() => { setShowWidget(false); setIsDragging(true) }}
               onDragEnd={() => { setShowWidget(true); setIsDragging(false) }}
               id={id}
               parentId={parentId}
            />
            {Array.from({ length: row }, (_, ii) => (
               <Grid container spacing={2} key={ii}>
                  {Array.from({ length: column }, (_, jj) => (
                     <Grid item key={jj} xs={12 / column} >
                        <WidgetDrogPad
                           widgets={items}
                           key={items[ii][jj].id}
                           targetId={items[ii][jj].id}
                           onDrop={moveItem}
                           variant="swap"
                           parent={id}
                        >
                           <GenerateWidget
                              item={items[ii][jj]}
                              onDelete={() => deleteItem(ii, jj)}
                              onAdd={(id: number, itemType: string) => addItem(ii, jj, itemType)}
                              onChange={(newItem: WIDGET_TYPE) => updateItem(ii, jj, newItem)}
                              widgetNames={widgetNames}
                              setWidgetNames={setWidgetNames}
                              setActive={() => setActive(items[ii][jj])}
                              setInactive={setInactive}
                           />
                        </WidgetDrogPad>
                     </Grid>
                  ))}
               </Grid>
            ))}

            <Box sx={{ textAlign: 'center', position: 'absolute', top: '45%', right: -30, display: showController ? '' : 'none' }}>
               <Tooltip title="add column" placement="top">
                  <IconButton size='small' onClick={addColumn}>
                     <AddCircleOutlineRoundedIcon />
                  </IconButton>
               </Tooltip>
            </Box>

            <Box sx={{ textAlign: 'center', position: 'absolute', right: 0, bottom: -30, left: 0, margin: 'auto', display: showController ? '' : 'none' }}>
               <Tooltip title="add row" placement="top">
                  <IconButton size='small' onClick={addRow}>
                     <AddCircleOutlineRoundedIcon />
                  </IconButton>
               </Tooltip>
            </Box>
         </Box>
      </Box>
   )
}

export default FormGrid