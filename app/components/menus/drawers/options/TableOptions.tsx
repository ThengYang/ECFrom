import { useState } from "react";

import {
   Box,
   TextField,
   Typography,
   Grid,
   IconButton,
   Button,
   Tooltip,
} from "@mui/material"

import { INPUTTABLE } from "@/app/constants/WigetType";

import GenericSelect from "@/app/components/inputs/Selects";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from "@/app/components/inputs/texts/Text.module.css";

interface OptionProps {
   activeWidget: INPUTTABLE,
   updateWidget: (widget: INPUTTABLE) => void

}

const ColumnOption = (props: OptionProps) => {

   const { activeWidget, updateWidget } = props

   const addColumn = () => {
      const col_index = (Date.now() + Math.floor(Math.random() * 1000000)) % 10000;
      updateWidget({
         ...activeWidget,
         column: [...activeWidget.column,
         {
            field: `column_${col_index}`,
            headerName: 'New Column',
            headerAlign: 'center',
            align: 'center',
            type: 'string',
            flex: 1,
            minWidth: 100,
            editable: true,
            sortable: true,
            filterable: true,
            menu: true,
         },
         ]
      });
   }

   const changeColHeader = (value: string, index: number) => {
      const newCols = [...activeWidget.column]
      newCols[index].headerName = value

      updateWidget({
         ...activeWidget,
         column: newCols
      })
   }

   const deletColumn = (event: any) => {
      const col_field = event.currentTarget.value
      updateWidget({
         ...activeWidget,
         column: activeWidget.column.filter(opt => opt.field !== col_field)
      });
   }

   const setColumnType = (value: string, colIndex: number) => {
      value = value === 'text' ? 'string' : value;

      const newColums = [...activeWidget.column]
      newColums[colIndex].type = value as "string" | "number" | "boolean" | "dateTime" | "date";

      updateWidget({
         ...activeWidget,
         column: newColums
      })
   }

   const setColumnEditability = (value: string, colIndex: number) => {
      const newColums = [...activeWidget.column]
      newColums[colIndex].editable = (value === 'editable') ? true : false;

      updateWidget({
         ...activeWidget,
         column: newColums
      })
   }

   const setColumnAlignment = (value: string, colIndex: number) => {
      const newColums = [...activeWidget.column]
      newColums[colIndex].align = value as any

      updateWidget({
         ...activeWidget,
         column: newColums
      })
   }

   const setColumnSortability = (value: string, colIndex: number) => {
      const newColums = [...activeWidget.column]
      newColums[colIndex].sortable = (value === 'enabled') ? true : false;

      updateWidget({
         ...activeWidget,
         column: newColums
      })
   }

   const setColumnFlex = (value: string, colIndex: number) => {
      const newColums = [...activeWidget.column]
      newColums[colIndex].flex = (value === 'auto') ? 1 : 0;

      updateWidget({
         ...activeWidget,
         column: newColums
      })
   }

   const setColumnWidth = (value: string, colIndex: number) => {
      const newColums = [...activeWidget.column]
      newColums[colIndex].width = parseFloat(value)

      updateWidget({
         ...activeWidget,
         column: newColums
      })
   }

   const setColumnPrefix = (value: string, colIndex: number) => {
      const newColums = [...activeWidget.column]
      newColums[colIndex].prefix = value
      newColums[colIndex].valueFormatter = (params) => `${value}${params}`

      updateWidget({
         ...activeWidget,
         column: newColums
      })
   }

   return (
      <Box
         sx={{
            alignItems: 'center',
            marginBottom: 5,
            padding: '0px 10px',
         }}
      >
         <Typography sx={{ mb: 1 }}>Columns</Typography>
         <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {activeWidget.column.map((opt, index) =>
               <Grid container sx={{ mb: 1.5 }} key={opt.field} spacing={0.5}>
                  <Grid item xs={12}>
                     <TextField
                        value={opt.headerName}
                        size="small"
                        sx={{ width: '100%' }}
                        InputProps={{
                           endAdornment:
                              <IconButton
                                 color='error'
                                 size='small'
                                 value={opt.field}
                                 onClick={deletColumn}
                                 disabled={opt.field === 'id'}
                              >
                                 <DeleteIcon />
                              </IconButton>,
                           style: { borderRadius: 0 }
                        }}
                        onChange={(event: any) => changeColHeader(event.target.value, index)}
                     />
                  </Grid>
                  <Grid item md={12} lg={6} sx={{ marginTop: 0.5 }}>
                     <GenericSelect
                        items={['text', 'number', 'date']}
                        value={opt.type === 'string' ? 'text' : opt.type}
                        title="Type"
                        disable={opt.field === 'id'}
                        sx={{ height: 30, borderRadius: 0 }}
                        onChange={(newValue: string) => setColumnType(newValue, index)}
                     />
                  </Grid>
                  <Grid item md={12} lg={6} sx={{ marginTop: 0.5 }}>
                     <GenericSelect
                        items={['editable', 'static']}
                        value={opt.editable ? 'editable' : 'static'}
                        title="Editing"
                        disable={opt.field === 'id'}
                        sx={{ height: 30, borderRadius: 0 }}
                        onChange={(newValue: string) => setColumnEditability(newValue, index)}
                     />
                  </Grid>
                  <Grid item md={12} lg={6} sx={{ marginTop: 0.5 }}>
                     <GenericSelect
                        items={['left', 'center', 'right']}
                        value={opt.align}
                        title="Align text"
                        sx={{ height: 30, borderRadius: 0 }}
                        onChange={(newValue: string) => setColumnAlignment(newValue, index)}
                     />
                  </Grid>
                  <Grid item md={12} lg={6} sx={{ marginTop: 0.5 }}>
                     <GenericSelect
                        items={['enabled', 'disabled']}
                        value={opt.sortable ? 'enabled' : 'disabled'}
                        title="Sorting"
                        sx={{ height: 30, borderRadius: 0 }}
                        onChange={(newValue: string) => setColumnSortability(newValue, index)}
                     />
                  </Grid>
                  <Grid item md={12} lg={6} sx={{ marginTop: 0.5 }}>
                     <GenericSelect
                        items={['auto', 'custom']}
                        value={opt.flex ? 'auto' : 'custom'}
                        title="Width option"
                        sx={{ height: 30, borderRadius: 0 }}
                        onChange={(newValue: string) => setColumnFlex(newValue, index)}
                     />
                  </Grid>
                  <Grid item md={12} lg={6} sx={{ marginTop: 0.5 }}>
                     <TextField
                        value={opt.width ? opt.width : ''}
                        className={styles.number}
                        type="number"
                        label='Width'
                        disabled={opt.flex ? true : false}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                           style: { height: '30px', borderRadius: 0 }
                        }}
                        inputProps={{
                           style: { padding: '5px' }
                        }}
                        onChange={(event: any) => setColumnWidth(event.target.value, index)}
                     />
                  </Grid>
                  <Grid item md={12} lg={6} sx={{ marginTop: 0.5 }}>
                     <TextField
                        value={opt.prefix ? opt.prefix : ''}
                        className={styles.number}
                        type="text"
                        label='Prefix'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                           style: { height: '30px', borderRadius: 0 }
                        }}
                        inputProps={{
                           style: { padding: '5px' }
                        }}
                        onChange={(event: any) => setColumnPrefix(event.target.value, index)}
                     />
                  </Grid>
               </Grid>
            )}
         </Box>
         <Box sx={{ m: 1 }}>
            <Button
               size="small"
               sx={{ textTransform: 'none', boxShadow: 'none', float: 'right' }}
               startIcon={<AddIcon />}
               onClick={addColumn}
            >
               Add column
            </Button>
         </Box>
      </Box>
   )
}

const RowOption = (props: OptionProps) => {

   const { activeWidget, updateWidget } = props

   const addRow = () => {
      let newRow: any = {}
      for (const item of activeWidget.column) {
         newRow[item.field] = item.field === 'id' ? activeWidget.row.length : ''
      }

      updateWidget({
         ...activeWidget,
         row: [...activeWidget.row, newRow]
      })
   }

   const deleteRow = (event: any) => {
      const id = parseInt(event.currentTarget.value)
      const newRows = activeWidget.row.filter(opt => opt.id !== id)
      for (let i = 0; i < newRows.length; i++) {
         newRows[i].id = i
      }

      updateWidget({
         ...activeWidget,
         row: newRows
      })
   }

   return (
      <Box
         sx={{
            alignItems: 'center',
            marginBottom: 5,
            padding: '0px 10px',
            mt: 2
         }}
      >
         <Typography sx={{ mb: 1 }}>Rows</Typography>
         <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {activeWidget.row.map(opt =>
               <Box sx={{ mt: 1 }} key={opt.id}>
                  <TextField
                     value={opt.id}
                     size="small"
                     sx={{ width: '100%' }}
                     InputProps={{
                        endAdornment:
                           <IconButton
                              color='error'
                              size='small'
                              value={opt.id}
                              onClick={deleteRow}
                           >
                              <DeleteIcon />
                           </IconButton>,
                        style: { borderRadius: 0 },
                        readOnly: true
                     }}
                  />
               </Box>
            )}
         </Box>
         <Button
            size="small"
            sx={{ textTransform: 'none', boxShadow: 'none', float: 'right', mt: 1 }}
            startIcon={<AddIcon />}
            onClick={addRow}
         >
            Add row
         </Button>
      </Box>
   )
}

const intOperators = ['plus number', 'minus number', 'multiplies number', 'divided by number']
const varOperators = ['plus field', 'minus field', 'multiplies field', 'divided by field']
const eqOperators = ['equals', 'is text']

interface AdvanceOptionProps {
   activeWidget: INPUTTABLE,
   updateWidget: (widget: INPUTTABLE) => void
   widgetNames: { [key: string]: any }
   getWidget: (id: string) => any
}

const AdvanceOption = (props: AdvanceOptionProps) => {

   const { activeWidget, updateWidget, widgetNames, getWidget } = props
   const [editingValue, setEditingValue] = useState<string>('')

   const [conditionOperators, setConditionOperators] = useState<Array<string>>([])
   const [conditionVariables, setConditionVariables] = useState<Array<string>>([])


   const addSetValueCondition = (target: string) => {
      let code = ['$$']
      if (activeWidget.setValue) {
         code = activeWidget.setValue.find(item => item.target === target)?.code.split('->') || ['$$']
      }
      const vars = code.filter(sub => !(intOperators.includes(sub) || varOperators.includes(sub) || eqOperators.includes(sub) || sub === ''))

      setConditionVariables(vars.length > 0 ? vars : [''])
      setConditionOperators(code.filter(sub => intOperators.includes(sub) || varOperators.includes(sub) || eqOperators.includes(sub)))
      setEditingValue(target)
   }

   const handleSetConditionOperators = (value: string, index: number) => {
      const newOps = [...conditionOperators]
      if ((intOperators.includes(value) && !intOperators.includes(newOps[index])) ||
         (varOperators.includes(value) && !varOperators.includes(newOps[index]))
      ) {
         const newVar = [...conditionVariables]
         newVar[index] = '$$'
         setConditionVariables(newVar)
      }
      else if (eqOperators.includes(value) && value !== newOps[index]) {
         const newVar = [...conditionVariables]
         newVar[index] = ''
         setConditionVariables(newVar)
      }

      newOps[index] = value

      setConditionOperators(newOps)
   }

   const handleSetConditionVariables = (value: string, index: number) => {
      const newVars = [...conditionVariables]
      newVars[index] = value
      setConditionVariables(newVars)
   }

   const addMoreCondition = () => {
      if (conditionVariables[conditionVariables.length - 1] && conditionOperators[0] !== 'is text' && getColumnType(editingValue) === 'number') {
         setConditionVariables([...conditionVariables, ''])
         setConditionOperators([...conditionOperators, varOperators[0]])
      }
   }

   const commitCondition = () => {

      let newCode = ''
      if (conditionVariables[0]) {
         for (var ii = 0; ii < conditionVariables.length; ii++) {
            if (conditionVariables[ii] && conditionVariables[ii] !== '$$')
               newCode += `->${conditionOperators[ii]}->${conditionVariables[ii]}`;
         }

         // console.log(editingValue, newCode)

         const targetIdx = activeWidget?.setValue ? activeWidget.setValue.findIndex(item => item.target === editingValue) : -1

         const colIdx = activeWidget.column.findIndex(opt => opt.field === editingValue)
         const newCol = [...activeWidget.column]
         newCol[colIdx].editable = false

         if (targetIdx !== -1 && activeWidget.setValue) {
            const tempSetValue = [...activeWidget.setValue]
            tempSetValue[targetIdx].code = newCode;
            updateWidget({
               ...activeWidget,
               column: newCol,
               setValue: tempSetValue
            })
         }
         else if (activeWidget.setValue) {
            updateWidget({
               ...activeWidget,
               column: newCol,
               setValue: [...activeWidget.setValue, { target: editingValue, code: newCode }]
            })
         }
         else {
            updateWidget({
               ...activeWidget,
               column: newCol,
               setValue: [{ target: editingValue, code: newCode }]
            })
         }
      }

      setEditingValue('')
   }

   const deleteCondition = () => {
      if (activeWidget.setValue && editingValue) {

         updateWidget({
            ...activeWidget,
            setValue: activeWidget.setValue.filter(cond => cond.target !== editingValue)
         })

         setConditionVariables([''])
         setConditionOperators([])
      }

   }

   const getColumnType = (colName: string) => {

      const colFound = activeWidget.column.find(
         opt => opt.field === colName.replaceAll('$', '')
      )

      if (colFound) return colFound.type;
      return ''
   }

   const selectableWidgets = editingValue ? Object.keys(widgetNames).filter((key: string) =>
      (key && key !== 'length' && key !== 'grid' && getWidget(widgetNames[key].id).parentId !== activeWidget.id) &&
      getWidget(widgetNames[key].id).responseType === getColumnType(editingValue)
   ) : []


   return (
      <Box
         sx={{
            alignItems: 'center',
            marginBottom: 1.5,
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#f2f2f2'

         }}
      >
         <Typography sx={{ mb: 1 }}>Set Value</Typography>
         {editingValue ?
            <Box sx={{ mb: 1 }}>
               <TextField
                  value={editingValue}
                  size="small"
                  sx={{ width: '100%' }}
                  InputProps={{
                     startAdornment:
                        <Tooltip title="save and go back" placement="top" enterDelay={400} arrow>
                           <IconButton
                              size="small"
                              onClick={commitCondition}
                           >
                              <ArrowBackIcon />
                           </IconButton>
                        </Tooltip>,
                     style: { borderRadius: 0, textAlign: 'center' },
                     readOnly: true

                  }}
                  inputProps={{
                     style: { textAlign: 'center', fontSize: 18 }
                  }}
               />
               <Box sx={{ mb: 1, mt: 1, overflowX: 'auto' }}>
                  {Array.from({ length: conditionVariables.length }, (v: any, idx: number) =>
                     idx == 0 ?
                        <Box key={idx}>
                           <GenericSelect
                              items={eqOperators}
                              value={conditionOperators[idx] || ''}
                              title={editingValue}
                              variant="inline"
                              onChange={(value: string) => handleSetConditionOperators(value, idx)}

                           />
                           {conditionOperators[idx] === 'equals' ?
                              <GenericSelect
                                 items={
                                    [...activeWidget.column.filter(
                                       opt => opt.type === getColumnType(editingValue) && opt.field !== editingValue
                                    ).map(opt => opt.field), ...selectableWidgets]
                                 }
                                 value={conditionVariables[idx].slice(1, -1)}

                                 variant="inline"
                                 onChange={(value: string) => handleSetConditionVariables('$' + value + '$', idx)}
                              /> :
                              conditionOperators[idx] === 'is text' ?
                                 <TextField
                                    value={conditionVariables[idx] ? conditionVariables[idx] : ''}
                                    type={getColumnType(editingValue)}
                                    className={styles.number}
                                    sx={{ marginLeft: 0.5 }}
                                    InputProps={{
                                       style: { height: '22px' }
                                    }}
                                    inputProps={{
                                       style: {
                                          width: conditionVariables[idx] ?
                                             conditionVariables[idx].length.toString() + 'ch' :
                                             '80px', padding: '2px 5px',
                                          minWidth: '80px'
                                       }
                                    }}
                                    onChange={(event: any) => handleSetConditionVariables(event.target.value, idx)}
                                 /> : <></>
                           }

                        </Box> :
                        <Box key={idx}>
                           <GenericSelect
                              items={[...varOperators, ...intOperators]}
                              value={conditionOperators[idx] || ''}
                              variant="inline"
                              onChange={(value: string) => handleSetConditionOperators(value, idx)}
                           // visible={conditionOperators[idx] && getColumnType(conditionVariables[idx]) === 'number' ? true : false}
                           />
                           {varOperators.includes(conditionOperators[idx]) ?
                              <GenericSelect
                                 items={
                                    [...activeWidget.column.filter(
                                       opt => opt.type === getColumnType(editingValue) && opt.field !== editingValue
                                    ).map(opt => opt.field), ...selectableWidgets]
                                 }
                                 value={conditionVariables[idx].slice(1, -1)}
                                 variant="inline"
                                 onChange={(value: string) => handleSetConditionVariables('$' + value + '$', idx)}
                                 visible={conditionOperators[idx - 1] ? true : false}
                              /> :
                              <TextField
                                 value={conditionVariables[idx] ? conditionVariables[idx] : ''}
                                 type={getColumnType(editingValue)}
                                 className={styles.number}
                                 sx={{ marginLeft: 0.5 }}
                                 InputProps={{
                                    style: { height: '22px' }
                                 }}
                                 inputProps={{
                                    style: {
                                       width: conditionVariables[idx] ?
                                          conditionVariables[idx].length.toString() + 'ch' :
                                          '80px', padding: '2px 5px',
                                       minWidth: '80px'
                                    }
                                 }}
                                 onChange={(event: any) => handleSetConditionVariables(event.target.value, idx)}
                              />
                           }

                        </Box>
                  )}

               </Box>

               <Button
                  size='small'
                  sx={{ textTransform: 'none' }}
                  startIcon={<AddIcon />}
                  onClick={addMoreCondition}
               >
                  add condition
               </Button>
               <Button
                  size='small'
                  sx={{ textTransform: 'none', float: 'right' }}
                  color="error"
                  onClick={deleteCondition}
               >
                  clear
               </Button>

            </Box> :
            <Box>
               {activeWidget.column.map(opt =>
                  <Box sx={{ mt: 1 }} key={opt.field}>
                     <Button
                        variant="outlined"
                        color="inherit"
                        size="small"
                        sx={{
                           width: '100%',
                           borderRadius: 0,
                           textTransform: 'none',
                           fontSize: 18,
                           display: opt.field === 'id' ? 'none' : ''
                        }}
                        onClick={() => addSetValueCondition(opt.field)}
                     >
                        {opt.headerName}
                     </Button>
                  </Box>
               )}
            </Box>
         }
      </Box>
   )
}

export { ColumnOption, RowOption, AdvanceOption }
