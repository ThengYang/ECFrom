import { ReactNode } from "react";

export type WIDGET_TYPE = NEWSECTION | TEXT | FORMGRID |
   INPUTTEXT | INPUTSELECT | INPUTMULTISELECT | INPUTDATETIME |
   INPUTCHECKLIST | INPUTTABLE

export type WIDGET_BLOCK = TEXT | FORMGRID |
   INPUTTEXT | INPUTSELECT | INPUTMULTISELECT | INPUTDATETIME |
   INPUTCHECKLIST | INPUTTABLE

export type WIDGET_FILL = TEXT | INPUTTEXT | INPUTSELECT | INPUTMULTISELECT | INPUTDATETIME |
   INPUTCHECKLIST | INPUTTABLE

export type WIDGET_RESPVAR = INPUTTEXT | INPUTDATETIME | INPUTCHECKLIST



export function HAS_STYLE_WIDGETS(object: any): object is FORMGRID |
   TEXT | INPUTTEXT | INPUTMULTISELECT | INPUTSELECT | INPUTDATETIME |
   INPUTCHECKLIST | INPUTTABLE {
   return (
      IS_FORMGRID(object) ||
      IS_TEXT(object) ||
      IS_INPUTTEXT(object) ||
      IS_INPUTSELECT(object) ||
      IS_INPUTMULTISELECT(object) ||
      IS_INPUTDATETIME(object) ||
      IS_INPUTCHECKLIST(object) ||
      IS_INPUTTABLE(object)
   )
}

export function HAS_RESPOND_TYPE(object: any): object is
   INPUTTEXT | INPUTDATETIME | INPUTCHECKLIST {
   return (
      IS_INPUTTEXT(object) ||
      IS_INPUTDATETIME(object) ||
      IS_INPUTCHECKLIST(object)
   )
}

export function GET_RESPOND_TYPE(object: any): Array<string> {
   if (IS_INPUTTEXT(object)) return ['short answer', 'paragraph', 'number', 'email', 'phone'];
   if (IS_INPUTDATETIME(object)) return ['date', 'time', 'datetime', 'daterange'];
   if (IS_INPUTCHECKLIST(object)) return ['radio', 'list'];

   return []
}

export function HAS_FLEX_COLUMN(object: any): object is INPUTCHECKLIST {
   return (
      IS_INPUTCHECKLIST(object)
   )
}

export function IS_INPUT_WIDGETS(object: any): object is
   INPUTTEXT | INPUTSELECT | INPUTMULTISELECT | INPUTDATETIME |
   INPUTCHECKLIST | INPUTTABLE {
   return (
      IS_INPUTTEXT(object) ||
      IS_INPUTSELECT(object) ||
      IS_INPUTMULTISELECT(object) ||
      IS_INPUTDATETIME(object) ||
      IS_INPUTCHECKLIST(object) ||
      IS_INPUTTABLE(object)
   )
}

export function IS_SELECT_WIDGETS(object: any): object is
   INPUTSELECT | INPUTMULTISELECT | INPUTCHECKLIST {
   return (
      IS_INPUTSELECT(object) ||
      IS_INPUTMULTISELECT(object) ||
      IS_INPUTCHECKLIST(object)
   )
}

export interface NEWSECTION {
   id: string,
   parentId: string,
   type: string
   name: string,
}

export function IS_NEWSECTION(object: any): object is NEWSECTION {
   return object?.type === 'new-section'
}

export interface TEXT {
   id: string,
   parentId: string,
   type: string,
   name: string,
   question: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   backgroundColor: string,
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number,
   width: number,
   height: number,
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}

export function IS_TEXT(object: any): object is TEXT {
   return object?.type === 'text'
}

export interface FORMGRID {
   id: string,
   parentId: string,
   type: string,
   name: string,
   row: number,
   column: number,
   items: Array<Array<string>>
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   backgroundColor: string,
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number,
   width: number,
   height: number,
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}
export function IS_FORMGRID(object: any): object is FORMGRID {
   return object?.type === 'grid'
}

export interface INPUTTEXT {
   id: string,
   parentId: string,
   type: string,
   name: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   backgroundColor: string,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number
   width: number,
   height: number,
   question: string,
   answer: string,
   require: boolean,
   responseType: 'short answer' | 'paragraph' | 'email' | 'number' | 'phone',
   variant: string,
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}
export function IS_INPUTTEXT(object: any): object is INPUTTEXT {
   return object?.type === 'text response'
}

export interface INPUTSELECT {
   id: string,
   parentId: string,
   type: string,
   name: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   backgroundColor: string,
   question: string,
   answer: string,
   options: Array<{ key: number, value: string }>,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number,
   width: number,
   height: number,
   require: boolean,
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}
export function IS_INPUTSELECT(object: any): object is INPUTSELECT {
   return object?.type === 'select'
}

export interface INPUTMULTISELECT {
   id: string,
   parentId: string,
   type: string,
   name: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   backgroundColor: string,
   question: string,
   answer: Array<string>,
   options: Array<{ key: number, value: string }>,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number,
   width: number,
   height: number,
   require: boolean,
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}
export function IS_INPUTMULTISELECT(object: any): object is INPUTMULTISELECT {
   return object?.type === 'multi select'
}

export interface INPUTDATETIME {
   id: string,
   parentId: string,
   type: string,
   name: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   backgroundColor: string,
   question: string,
   answer: string,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number,
   width: number,
   height: number,
   require: boolean,
   responseType: 'date' | 'datetime' | 'time' | 'daterange',
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}

export function IS_INPUTDATETIME(object: any): object is INPUTDATETIME {
   return object?.type === 'datetime'
}

export interface INPUTCHECKLIST {
   id: string,
   parentId: string,
   type: string,
   name: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   backgroundColor: string,
   question: string,
   answer: Array<string>,
   options: Array<{ key: number, value: string }>,
   groupColumn: number, // should just be a flex??
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number,
   width: number,
   height: number,
   require: boolean,
   responseType: 'radio' | 'list',
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}

export function IS_INPUTCHECKLIST(object: any): object is INPUTCHECKLIST {
   return object?.type === 'checklist'
}

export interface INPUTTABLE {

   id: string,
   parentId: string,
   type: string,
   name: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   fontWeight: number,
   fontStyle: string,
   lineHeight: number,
   letterSpacing: number,
   backgroundColor: string,
   question: string,
   answer: Array<Array<string>>,
   column: Array<
      {
         field: string,
         headerName: string,
         headerAlign: 'left' | 'center' | 'right',
         align: 'left' | 'center' | 'right',
         type: 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions'
         width?: number,
         minWidth?: number,
         maxWidth?: number,
         flex?: number
         editable?: boolean,
         sortable?: boolean,
         filterable?: boolean,
         resizable?: boolean,
         menu: boolean,
         min?: number,
         max?: number,
         prefix?: string,
         renderHeader?: () => ReactNode,
         valueFormatter?: (params: any) => void,
         valueGetter?: (params: any) => void,
      }
   >,

   row: Array<{ id: number, [key: string]: any }>,
   footer: string,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   paddingTop: number,
   paddingBottom: number,
   paddingLeft: number,
   paddingRight: number,
   width: number,
   height: number,
   require: boolean,
   visibility?: {
      variables?: Array<string>,
      operators?: Array<string>,
      conditions?: Array<string>,
      mergers?: Array<string>
      conditional: boolean,
      action: string,
   }
   setValue?: Array<{
      target: string
      code: string
   }>
}

export function IS_INPUTTABLE(object: any): object is INPUTTABLE {
   return object?.type === 'table'
}

export interface PAGE {
   id: string,
   pageName: string,
   pageNumber: number,
   items:
   [
      NEWSECTION |
      TEXT
   ]
}