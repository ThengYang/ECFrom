export type WIDGET_TYPE = NEWSECTION | TEXT | FORMGRID |
   INPUTTEXT | INPUTSELECT | INPUTMULTISELECT | INPUTDATETIME |
   INPUTCHECKLIST | INPUTTABLE

export function HAS_STYLE_WIDGETS(object: any): object is
   TEXT | INPUTTEXT | INPUTMULTISELECT | INPUTSELECT | INPUTDATETIME |
   INPUTCHECKLIST | INPUTTABLE {
   return (
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
   if (IS_INPUTTEXT(object)) return ['short answer', 'paragraph', 'Number', 'Email', 'Phone'];
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
   value: string,
   fontSize: number,
   fontColor: string,
   fontFamily: string,
   lineHeight: number,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
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
   items: Array<Array<WIDGET_TYPE>>
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
   lineHeight: number,
   question: string,
   answer: string,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   require: boolean,
   responseType: 'short answer' | 'paragraph' | 'email' | 'number' | 'phone'
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
   lineHeight: number,
   question: string,
   answer: string,
   options: Array<{ key: number, value: string }>,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   require: boolean,
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
   lineHeight: number,
   question: string,
   answer: Array<string>,
   options: Array<{ key: number, value: string }>,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   require: boolean,
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
   lineHeight: number,
   question: string,
   answer: string,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   require: boolean,
   responseType: 'date' | 'datetime' | 'time' | 'daterange'
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
   lineHeight: number,
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
   require: boolean,
   responseType: 'radio' | 'list'
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
   lineHeight: number,
   question: string,
   answer: Array<Array<string>>,
   label: Array<string>,
   column: number,
   row: number,
   align: 'left' | 'center' | 'right' | 'justify',
   justify: 'left' | 'center' | 'right',
   marginTop: number,
   marginBottom: number,
   marginLeft: number,
   marginRight: number,
   require: boolean,
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