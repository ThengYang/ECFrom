import styles from "@/app/components/inputs/texts/Text.module.css";

import {
   Box,
   Typography,
   TextField,
   IconButton,
   Button,
   Tooltip,

} from "@mui/material";

import { WIDGET_BLOCK } from "@/app/constants/WigetType";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import CloseIcon from '@mui/icons-material/Close';

import GenericTab from '../../tabs/GenericTab';
import GenericSelect from '@/app/components/inputs/Selects';


const stringOperators = ['contains', 'does not contains', 'is', 'is not']
const intOperators = ['plus', 'minus', 'multiplies', 'divided by']
const compOperatos = ['equals', 'not equals', 'less than', 'greater than', 'less than or equals', 'greater than or equals']
const nullifyOperators = ['is empty', 'is not empty']

interface WidgetVisibilityOptionProps {
   activeWidget: WIDGET_BLOCK,
   updateWidget: (widget: WIDGET_BLOCK) => void
   widgetNames: { [key: string]: any }
   getWidget: (id: string) => any
}

const WidgetVisibilityOption = (props: WidgetVisibilityOptionProps) => {
   const {
      activeWidget,
      updateWidget,
      getWidget,
      widgetNames
   } = props

   const names = Object.keys(widgetNames).filter((key: string) =>
      (key && key !== 'length' && key !== 'grid' && getWidget(widgetNames[key].id).parentId !== activeWidget.id)
   );

   const setWidgetVisibility = (value: number) => {
      const newVis = value === 1 ? 'hidden' : value === 2 ? activeWidget.visibility?.action ? activeWidget.visibility.action : 'visible' : 'visible'

      updateWidget({
         ...activeWidget,
         visibility: {
            variables: activeWidget.visibility?.variables ? activeWidget.visibility.variables : [names[0]],
            operators: activeWidget.visibility?.operators ? activeWidget.visibility.operators : ['is'],
            conditions: activeWidget.visibility?.conditions ? activeWidget.visibility.conditions : [''],
            mergers: activeWidget.visibility?.mergers ? activeWidget.visibility.mergers : ['and'],
            conditional: (value === 2),
            action: newVis
         }
      })

   }

   const setVisibilityVariable = (value: string, index: number) => {
      if (activeWidget.visibility?.variables) {
         let newVar = [...activeWidget.visibility.variables]
         newVar[index] = value
         updateWidget({
            ...activeWidget,
            visibility:
            {
               ...activeWidget.visibility,
               variables: newVar
            }
         })
      }
   }

   const setVisibilityOperator = (value: string, index: number) => {

      if (activeWidget.visibility?.operators) {
         let newOp = [...activeWidget.visibility.operators]
         newOp[index] = value

         let newVar = activeWidget.visibility.variables ? [...activeWidget.visibility.variables] : []
         let newMerger = activeWidget.visibility.mergers ? [...activeWidget.visibility.mergers] : []
         let newCond = activeWidget.visibility.conditions ? [...activeWidget.visibility.conditions] : []

         if (intOperators.includes(value)) {
            if (!newVar[index + 1]) newVar.push(names[0]);

            newMerger[index + 1] ? newMerger[index + 1] = '' : newMerger.push('')
            newOp[index + 1] ? newOp[index + 1] = 'equals' : newOp.push('equals')
            newCond[index] ? newCond[index] = '' : newCond.push('')
         }

         updateWidget({
            ...activeWidget,
            visibility:
            {
               ...activeWidget.visibility,
               operators: newOp,
               variables: newVar,
               mergers: newMerger,
               conditions: newCond,
            }
         })
      }
   }

   const setVisibilityCondition = (value: string, index: number) => {
      if (activeWidget.visibility?.conditions) {
         let newCond = [...activeWidget.visibility.conditions]
         newCond[index] = value
         updateWidget({
            ...activeWidget,
            visibility: {
               ...activeWidget.visibility,
               conditions: newCond
            }
         })
      }
   }

   const addVisibilityCondition = () => {
      if (activeWidget.visibility) {
         const newVar = activeWidget.visibility?.variables ? [...activeWidget.visibility.variables, names[0]] : [names[0]]
         const newOp = activeWidget.visibility?.operators ? [...activeWidget.visibility.operators, 'is'] : ['is']
         const newCond = activeWidget.visibility?.conditions ? [...activeWidget.visibility.conditions, ''] : ['']
         const newMerge = activeWidget.visibility?.mergers ? [...activeWidget.visibility.mergers, 'and'] : ['and']

         updateWidget({
            ...activeWidget,
            visibility: {
               ...activeWidget.visibility,
               variables: newVar,
               operators: newOp,
               conditions: newCond,
               mergers: newMerge
            }
         })
      }
   }

   const removeVisibilityCondition = (index: number) => {
      if (activeWidget.visibility?.operators) {
         const indices = (activeWidget.visibility.operators[index] === 'plus') ? [index, index + 1] : [index];
         updateWidget({
            ...activeWidget,
            visibility: {
               ...activeWidget.visibility,
               variables: activeWidget.visibility.variables?.filter((v, i) => !indices.includes(i)),
               operators: activeWidget.visibility.operators?.filter((v, i) => !indices.includes(i)),
               conditions: activeWidget.visibility.conditions?.filter((v, i) => !indices.includes(i))
            }
         })
      }
   }

   const setVisibilityMerger = (value: string, index: number) => {
      if (activeWidget.visibility?.mergers) {
         let newMerge = [...activeWidget.visibility.mergers]
         newMerge[index] = value
         updateWidget({
            ...activeWidget,
            visibility: {
               ...activeWidget.visibility,
               mergers: newMerge
            }
         })
      }
   }

   const setVisibilityAction = (value: string) => {
      if (activeWidget.visibility) {
         updateWidget({
            ...activeWidget,
            visibility: {
               ...activeWidget.visibility,
               action: value === 'set visible' ? 'visible' : 'hidden'
            }
         })
      }
   }

   return (
      <Box sx={{
         alignItems: 'center',
         marginBottom: 1.5,
         padding: '10px',
         borderRadius: '5px',
         backgroundColor: '#f2f2f2'
      }}>
         <Box sx={{ marginBottom: 1.5 }}>
            <Typography sx={{ mb: 1 }}>Visibility</Typography>
            <GenericTab
               activeTab={
                  activeWidget.visibility?.conditional ? 2 :
                     activeWidget.visibility?.action === 'hidden' ? 1 : 0
               }
               tabs={[
                  <Tooltip title="visible" placement='top'>
                     <VisibilityIcon />
                  </Tooltip>
                  ,
                  <Tooltip title="hidden" placement='top'>
                     <VisibilityOffIcon />
                  </Tooltip>,
                  <Tooltip title="condition" placement='top'>
                     <DynamicFormIcon />
                  </Tooltip>
               ]}
               variant='filled'
               onChange={setWidgetVisibility}
            />
         </Box>
         <Box sx={{ display: activeWidget.visibility?.conditional ? '' : 'none' }}>
            <Box sx={{ mb: 1.5 }}>
               <Typography>Conditions</Typography>
               <Box sx={{
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  mb: 1,
                  borderTop: '1px solid',
                  mt: 1
               }}>
                  {activeWidget.visibility?.variables && activeWidget.visibility?.operators && activeWidget.visibility?.conditions ?
                     Array.from({ length: activeWidget.visibility.variables.length }, (v, ii) =>

                        <Box
                           sx={{ mb: 1, mt: 1 }}
                           key={ii}
                        >
                           <IconButton
                              size='small'
                              disabled={
                                 ii === 0 ||
                                 activeWidget?.visibility?.operators &&
                                 intOperators.includes(activeWidget.visibility.operators[ii - 1])
                              }
                              color='error'
                              onClick={() => removeVisibilityCondition(ii)}
                           >
                              <CloseIcon />
                           </IconButton>

                           {ii === 0 ?
                              <GenericSelect
                                 items={names}
                                 value={activeWidget.visibility?.variables ? activeWidget.visibility.variables[ii] : ''}
                                 title='When'
                                 onChange={(value: string) => setVisibilityVariable(value, ii)}
                                 variant='inline'
                              /> :
                              <span>
                                 <GenericSelect
                                    items={['and', 'or']}
                                    value={activeWidget.visibility?.mergers ? activeWidget.visibility?.mergers[ii] : ''}
                                    variant='inline'
                                    sx={{
                                       display: activeWidget?.visibility?.operators &&
                                          intOperators.includes(activeWidget.visibility.operators[ii - 1]) ? 'none' : ''
                                    }}
                                    onChange={(value: string) => setVisibilityMerger(value, ii)}
                                 />
                                 <GenericSelect
                                    items={
                                       activeWidget.visibility?.operators &&
                                          intOperators.includes(activeWidget.visibility?.operators[ii - 1]) ?
                                          names.filter(name => getWidget(widgetNames[name].id).responseType === 'number') : names
                                    }
                                    value={activeWidget.visibility?.variables ? activeWidget.visibility.variables[ii] : ''}
                                    onChange={(value: string) => setVisibilityVariable(value, ii)}
                                    variant='inline'
                                 />
                              </span>
                           }

                           <GenericSelect
                              items={
                                 activeWidget.visibility?.operators &&
                                    intOperators.includes(activeWidget.visibility?.operators[ii - 1]) ?
                                    [...compOperatos, ...intOperators] : activeWidget.visibility?.variables &&
                                       getWidget(widgetNames[activeWidget.visibility?.variables[ii]].id).responseType === 'number' ?
                                       [...stringOperators, ...nullifyOperators, ...intOperators] :
                                       [...stringOperators, ...nullifyOperators]
                              }

                              value={activeWidget.visibility?.operators ? activeWidget.visibility.operators[ii] : 'is'}
                              onChange={(value: string) => setVisibilityOperator(value, ii)}
                              variant='inline'
                           />
                           {activeWidget?.visibility?.operators &&
                              (stringOperators.includes(activeWidget.visibility.operators[ii]) ||
                                 compOperatos.includes(activeWidget.visibility.operators[ii])) ?
                              activeWidget?.visibility?.variables &&
                                 widgetNames[activeWidget.visibility.variables[ii]].type.includes('text') ?
                                 <TextField
                                    value={activeWidget.visibility.conditions ? activeWidget.visibility.conditions[ii] : ''}
                                    type={intOperators.includes(activeWidget.visibility.operators[ii - 1]) ? 'number' : 'text'}
                                    size='small'
                                    sx={{ ml: 0.5 }}
                                    className={styles.number}
                                    InputProps={{
                                       style: { height: '22px', marginTop: '4px' }
                                    }}
                                    inputProps={{
                                       style: {
                                          padding: '2px 5px',
                                          minWidth: '80px',
                                          width: activeWidget.visibility.conditions && activeWidget.visibility.conditions[ii].length ?
                                             activeWidget.visibility.conditions[ii].length + 'px' : '80px'
                                       }
                                    }}
                                    onChange={(event: any) => setVisibilityCondition(event.target.value, ii)}
                                 /> :
                                 activeWidget?.visibility?.variables && widgetNames[activeWidget.visibility.variables[ii]].type === 'select' ?
                                    <GenericSelect
                                       items={getWidget(widgetNames[activeWidget.visibility.variables[ii]].id).options}
                                       value={activeWidget.visibility.conditions ? activeWidget.visibility.conditions[ii] : ''}
                                       variant='inline'
                                       onChange={(value: string) => setVisibilityCondition(value, ii)}
                                    /> : <></> :
                              <></>
                           }
                        </Box>) : <></>
                  }
               </Box>
               <Button
                  size='small'
                  startIcon={<AddIcon />}
                  sx={{ textTransform: 'none' }}
                  onClick={addVisibilityCondition}
               >
                  Add condition
               </Button>
            </Box>
            <Box>
               <Typography sx={{ marginBottom: 1 }}>Actions</Typography>
               <GenericSelect
                  items={['set visible', 'set hidden']}
                  value={activeWidget.visibility?.action ? 'set ' + activeWidget.visibility.action : ''}
                  sx={{ borderRadius: 0 }}
                  onChange={(value: string) => setVisibilityAction(value)}
               />
            </Box>
         </Box>
      </Box>
   )
}

export default WidgetVisibilityOption