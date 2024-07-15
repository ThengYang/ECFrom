import { v4 as uuidv4 } from 'uuid';
import { WIDGET_TYPE } from '../constants/WigetType';

export default function initialize(
   parentId: string,
   widgetType: string,
   widgetNames: { [key: string]: any },
) {

   let newWidget: WIDGET_TYPE = {
      type: '',
      id: '-1',
      name: '',
      parentId: parentId
   }

   let widgetName = ''
   let widgetMetaType = 'text'
   const widgetId = uuidv4();

   switch (widgetType) {
      case 'title text':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Title ${i}`]) {
               widgetName = `Title ${i}`
               widgetMetaType = 'text'
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'text',
            name: widgetName,
            question: 'Add your title text here',
            fontSize: 24,
            fontWeight: 900,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            fontColor: 'inherit',
            fontFamily: 'Default',
            align: 'center',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit'
         }
         break;

      case 'subtitle text':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Subtitle ${i}`]) {
               widgetName = `Subtitle ${i}`
               widgetMetaType = 'text'
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'text',
            name: widgetName,
            question: 'Add your subtitle text here',
            fontSize: 18,
            fontColor: 'inherit',
            fontFamily: 'Default',
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit'
         }
         break;

      case 'grid':
         widgetName = 'grid'
         widgetMetaType = 'grid'

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'grid',
            name: '',
            fontFamily: 'Default',
            fontColor: 'inherit',
            fontSize: 16,
            fontWeight: 500,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'center',
            justify: 'center',
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit',
            row: 2,
            column: 2,
            items: [['', ''], ['', '']]
         }
         break;

      case 'text response':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Question ${i}`]) {
               widgetName = `Question ${i}`
               widgetMetaType = 'text response'
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'text response',
            name: widgetName,
            fontColor: 'inherit',
            fontSize: 16,
            fontFamily: 'Default',
            fontWeight: 500,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit',
            question: '',
            answer: '',
            require: false,
            responseType: 'short answer',
         }
         break;

      case 'datetime':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Date time ${i}`]) {
               widgetName = `Date time ${i}`
               widgetMetaType = "datetime"
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'datetime',
            name: widgetName,
            fontColor: 'inherit',
            fontSize: 16,
            fontFamily: 'Default',
            fontWeight: 500,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit',
            question: '',
            answer: '',
            require: false,
            responseType: 'datetime'
         }
         break;

      case 'single select':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Select ${i}`]) {
               widgetName = `Select ${i}`
               widgetMetaType = 'select'
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'select',
            name: widgetName,
            fontColor: 'inherit',
            fontSize: 16,
            fontFamily: 'Default',
            fontWeight: 500,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit',
            question: '',
            answer: '',
            options: [{ key: 0, value: 'Option' }],
            require: false,
         }
         break;

      case 'multi select':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Multi Select ${i}`]) {
               widgetName = `Multi Select ${i}`
               widgetMetaType = 'multi select'
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'multi select',
            name: widgetName,
            fontColor: 'inherit',
            fontSize: 16,
            fontFamily: 'Default',
            fontWeight: 500,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit',
            question: '',
            answer: [],
            options: [{ key: 0, value: 'Option' }],
            require: false,
         }
         break;

      case 'checklist':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Checklist ${i}`]) {
               widgetName = `Checklist ${i}`
               widgetMetaType = 'checklist'
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'checklist',
            name: widgetName,
            fontColor: 'inherit',
            fontSize: 16,
            fontFamily: 'Default',
            fontWeight: 500,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit',
            question: '',
            answer: [],
            options: [{ key: 0, value: 'Option 1' }, { key: 1, value: 'Option 2' }],
            responseType: 'radio',
            groupColumn: 1,
            require: false,

         }
         break;

      case 'table':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Table ${i}`]) {
               widgetName = `Table ${i}`
               widgetMetaType = 'table'
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'table',
            name: widgetName,
            fontColor: 'inherit',
            fontSize: 16,
            fontFamily: 'Default',
            fontWeight: 500,
            fontStyle: 'Normal',
            lineHeight: 1.5,
            letterSpacing: 0,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: 'inherit',
            question: '',
            answer: [[]],
            column: [
               {
                  field: 'id',
                  headerName: 'Index',
                  headerAlign: 'center',
                  align: 'center',
                  type: 'number',
                  width: 75,
                  editable: false,
                  sortable: true,
                  filterable: false,
                  resizable: false,
                  menu: false,
               },
               {
                  field: 'column_2',
                  headerName: 'Column 2',
                  headerAlign: 'center',
                  align: 'center',
                  type: 'string',
                  flex: 1,
                  width: 100,
                  editable: true,
                  sortable: true,
                  filterable: true,
                  prefix: '$',
                  valueFormatter: (params) => `$${params}`,
                  menu: true,
               },
               {
                  field: 'column_3',
                  headerName: 'Column 3',
                  headerAlign: 'center',
                  align: 'center',
                  type: 'string',
                  flex: 1,
                  width: 100,
                  editable: true,
                  sortable: true,
                  filterable: true,
                  menu: true,
               },
               {
                  field: 'column_4',
                  headerName: 'Column 4',
                  headerAlign: 'center',
                  align: 'center',
                  type: 'string',
                  flex: 1,
                  width: 100,
                  editable: true,
                  sortable: true,
                  filterable: true,
                  menu: true,
               },
            ],
            row: [
               { id: 0, column_2: '', column_3: '', column_4: '' },
               { id: 1, column_2: '', column_3: '', column_4: '' },
               { id: 2, column_2: '', column_3: '', column_4: '' },
               { id: 3, column_2: '', column_3: '', column_4: '' },
            ],
            footer: '',
            require: false,
         }
         break;
   }

   return {
      newWidget: newWidget,
      newWidgetNames:
      {
         ...widgetNames,
         [widgetName]: { id: widgetId, type: widgetMetaType },
         length: widgetNames.length + 1
      }
   }
}