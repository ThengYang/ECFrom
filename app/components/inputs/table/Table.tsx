import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { Box } from "@mui/material"
import {
   DataGrid, GridCellModes, useGridApiRef,
   gridExpandedRowCountSelector,
   gridVisibleColumnDefinitionsSelector,
   gridExpandedSortedRowIdsSelector,
   GridColDef
} from '@mui/x-data-grid';

interface TableProps {

   column: GridColDef<{ [key: string]: any; id: number; }>[]
   row: Array<{ id: number, [key: string]: any }>
   makeFooter?: () => React.ReactNode
   setValue?: (row: Array<{ id: number, [key: string]: any }>) => void
}

const Table = (props: TableProps) => {
   const {
      column,
      row,
      setValue = () => void 0,
      makeFooter = () => void 0,
   } = props

   const [cellModesModel, setCellModesModel] = useState({});
   const dataGridRef = useGridApiRef();
   const [maxTableWidth, setMaxTableWidth] = useState<number>()

   const boxRef = useRef<HTMLElement>()
   const [coordinates, setCoordinates] = useState({
      rowIndex: 0,
      colIndex: 1,
   });


   useLayoutEffect(() => {
      function updateSize() {
         if (boxRef.current) {
            setMaxTableWidth(boxRef.current.clientWidth)
         }
      }
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
   }, []);

   useEffect(() => {
      try {
         const { rowIndex, colIndex } = coordinates;
         const id = gridExpandedSortedRowIdsSelector(dataGridRef)[rowIndex];
         const column = gridVisibleColumnDefinitionsSelector(dataGridRef)[colIndex];
         dataGridRef?.current?.scrollToIndexes(coordinates);
         dataGridRef.current?.setCellFocus(id, column.field);

         setCellActive(id, column.field);
      }
      catch { }

   }, [coordinates]);

   const setCellActive = (rowIndex: any, colIndex: any) => {
      setCellModesModel((prevModel: any) => {
         return {
            // Revert the mode of the other cells from other rows
            ...Object.keys(prevModel).reduce(
               (acc, id) => ({
                  ...acc,
                  [id]: Object.keys(prevModel[id]).reduce(
                     (acc2, field) => ({
                        ...acc2,
                        [field]: { mode: GridCellModes.View },
                     }),
                     {},
                  ),
               }),
               {},
            ),
            [rowIndex]: {
               // Revert the mode of other cells in the same row
               ...Object.keys(prevModel[rowIndex] || {}).reduce(
                  (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
                  {},
               ),
               [colIndex]: { mode: GridCellModes.Edit },
            },
         };
      });
   }

   const handleCellClick = (params: any, event: any) => {
      if (!params.isEditable) {
         return;
      }
      if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
         return;
      }

      if (dataGridRef) {
         const rowIndex = gridExpandedSortedRowIdsSelector(dataGridRef).findIndex(
            (id) => id === params.id,
         );
         const colIndex = gridVisibleColumnDefinitionsSelector(dataGridRef).findIndex(
            (column) => column.field === params.field,
         );
         setCoordinates({ rowIndex, colIndex });
      }

      setCellActive(params.id, params.field);
   }

   const handleCellEditDone = (params: any, event: any) => {
      if (!params.isEditable) {
         return;
      }
      setCellModesModel({
         [params.id]: {
            [params.field]: { mode: GridCellModes.View },
         }
      })
   }
   const processRowUpdate = (data: any) => {
      const newRow = row.map(opt => opt.id === data.id ? data : opt)

      setValue(newRow)

      return data;
   }


   const handleKeyDown = (event: any) => {

      if ((event.key === 'Tab' || event.key === 'Enter') && dataGridRef?.current) {
         let currentRowIndex = coordinates.rowIndex;
         let currentColIndex = coordinates.colIndex + 1;

         const noEdit = column.map((col) => col.editable);
         const maxRowIndex = gridExpandedRowCountSelector(dataGridRef) - 1;

         let first_editable: number = -1;

         for (let i = 0; i < noEdit.length; i++) {

            if (noEdit[i] && first_editable === -1) {
               first_editable = i;
            }

            if (noEdit[currentColIndex]) {
               break;
            }
            else if (currentColIndex >= noEdit.length - 1) {
               currentRowIndex += 1
               currentColIndex = first_editable >= 0 ? first_editable : 0;
            }
            else {
               currentColIndex += 1;
            }
         }

         if (currentRowIndex <= maxRowIndex && currentColIndex >= 0) {
            setCoordinates({ rowIndex: currentRowIndex, colIndex: currentColIndex });
         }
      }
   };

   return (
      <Box
         sx={{
            maxWidth: maxTableWidth,
            maxHeight: 500,
            margin: 'auto',
            overflow: 'auto',
            mt: 1,
         }}>
         <DataGrid
            columns={column}
            rows={row}
            showCellVerticalBorder
            disableColumnMenu
            cellModesModel={cellModesModel}
            onCellClick={handleCellClick}
            onCellEditStop={handleCellEditDone}
            onCellKeyDown={(_, event) => handleKeyDown(event)}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(err) => console.log(err)}
            pageSizeOptions={[row.length]}
            slots={{
               footer: makeFooter
            }}
            paginationModel={{
               pageSize: row.length,
               page: 0
            }}
            apiRef={dataGridRef}
         />
      </Box>
   )
}

export default Table