import { v4 as uuidv4 } from 'uuid';
import { WIDGET_TYPE } from '../constants/WigetType';

const initialize = (parentId: string, widgetType: string, widgetNames: { [key: string]: any }) => {

   let newWidget: WIDGET_TYPE = {
      type: '',
      id: '-1',
      name: '',
      parentId: parentId
   }

   let widgetName = ''
   const widgetId = uuidv4();

   switch (widgetType) {
      case 'title text':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Title ${i}`]) {
               widgetName = `Title ${i}`
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'text',
            name: widgetName,
            value: 'Add your title text here',
            fontSize: 24,
            lineHeight: 1.5,
            fontColor: '#000000',
            fontFamily: 'Arial',
            align: 'center',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1
         }
         break;

      case 'subtitle text':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Subtitle ${i}`]) {
               widgetName = `Subtitle ${i}`
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'text',
            name: widgetName,
            value: 'Add your subtitle text here',
            fontSize: 18,
            fontColor: '#000000',
            fontFamily: 'Arial',
            lineHeight: 1.5,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1
         }
         break;

      case 'grid':
         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'grid',
            name: '',
            row: 2,
            column: 2,
            items: [
               [{
                  id: uuidv4(),
                  parentId: widgetId,
                  type: 'new-section',
                  name: ''
               },
               {
                  id: uuidv4(),
                  parentId: widgetId,
                  type: 'new-section',
                  name: ''
               }
               ],

               [{
                  id: uuidv4(),
                  parentId: widgetId,
                  type: 'new-section',
                  name: ''
               },
               {
                  id: uuidv4(),
                  parentId: widgetId,
                  type: 'new-section',
                  name: ''
               }],
            ]
         }
         break;

      case 'text response':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Question ${i}`]) {
               widgetName = `Question ${i}`
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'text response',
            name: widgetName,
            fontColor: '#000000',
            fontSize: 16,
            fontFamily: 'Arial',
            lineHeight: 1.5,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            question: '',
            answer: '',
            require: false,
            responseType: 'short answer'
         }
         break;

      case 'datetime':
         for (let i = 1; i < widgetNames.length + 2; i++) {
            if (!widgetNames[`Date time ${i}`]) {
               widgetName = `Date time ${i}`
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'datetime',
            name: widgetName,
            fontColor: '#000000',
            fontSize: 16,
            fontFamily: 'Arial',
            lineHeight: 1.5,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
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
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'select',
            name: widgetName,
            fontColor: '#000000',
            fontSize: 16,
            fontFamily: 'Arial',
            lineHeight: 1.5,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
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
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'multi select',
            name: widgetName,
            fontColor: '#000000',
            fontSize: 16,
            fontFamily: 'Arial',
            lineHeight: 1.5,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
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
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'checklist',
            name: widgetName,
            fontColor: '#000000',
            fontSize: 16,
            fontFamily: 'Arial',
            lineHeight: 1.5,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
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
               break;
            }
         }

         newWidget = {
            id: widgetId,
            parentId: parentId,
            type: 'table',
            name: widgetName,
            fontColor: '#000000',
            fontSize: 16,
            fontFamily: 'Arial',
            lineHeight: 1.5,
            align: 'left',
            justify: 'left',
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 1,
            question: '',
            answer: [[]],
            label: ['Column 1', 'Column 2', 'Column 3'],
            column: 3,
            row: 2,
            require: false,
         }
         break;
   }


   return { widget: newWidget, names: { ...widgetNames, [widgetName]: widgetId, length: widgetNames.length + 1 } }
}


export default initialize