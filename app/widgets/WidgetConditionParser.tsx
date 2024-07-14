import { WIDGET_TYPE, IS_TEXT, IS_INPUTSELECT } from "../constants/WigetType";

export default function parseCondition(
   getWidget: (id: string) => any,
   widgetNames: { [key: string]: any },
   parseEvent: string,
   data: any
): any {

   if (parseEvent === 'visibility') {

      let isTrue = true;

      if (data?.variables && data?.operators && data?.conditions) {

         const widget_ids = data.variables.map((name: string) => name ? widgetNames[name].id : '')
         let mathLogicAnswer = undefined

         for (var ii = 0; ii < data.operators.length; ii++) {

            const current_widget = getWidget(widget_ids[ii])
            const current_cond = data.conditions[ii]

            if (data.operators[ii] === 'is') {
               if (IS_TEXT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.question.trim() === current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.question.trim() === current_cond.trim()));
               }
               else if (IS_INPUTSELECT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.answer.trim() === current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.answer === current_cond));
               }
            }
            else if (data.operators[ii] === 'is not') {
               if (IS_TEXT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.question.trim() !== current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.question !== current_cond));

               }
               else if (IS_INPUTSELECT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.answer.trim() !== current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.answer.trim() !== current_cond.trim()));
               }
            }
            else if (data.operators[ii] === 'contains') {
               if (IS_TEXT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && current_widget.question.includes(current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || current_widget.question.includes(current_cond.trim()));

               }
               else if (IS_INPUTSELECT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && current_widget.answer.includes(current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || current_widget.answer.includes(current_cond.trim()));
               }
            }
            else if (data.operators[ii] === 'does not contains') {
               if (IS_TEXT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && !current_widget.question.includes(current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || !current_widget.question.includes(current_cond.trim()));

               }
               else if (IS_INPUTSELECT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && current_widget.answer.includes(current_cond.trim()));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || current_widget.answer.includes(current_cond.trim()));
               }
            }
            else if (data.operators[ii] === 'is empty') {
               if (IS_TEXT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.question === ''));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.question === ''));

               }
               else if (IS_INPUTSELECT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.answer === ''));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.answer === ''));
               }
            }
            else if (data.operators[ii] === 'is not empty') {
               if (IS_TEXT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.question !== ''));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.question !== ''));

               }
               else if (IS_INPUTSELECT(current_widget)) {
                  if (data.mergers[ii] === 'and') isTrue = (isTrue && (current_widget.answer !== ''));
                  else if (data.mergers[ii] === 'or') isTrue = (isTrue || (current_widget.answer !== ''));
               }
            }
            else if (data.operators[ii] === 'plus') {
               if (mathLogicAnswer === undefined) {
                  mathLogicAnswer = parseFloat(current_widget.answer) + parseFloat(getWidget(widgetNames[data.variables[ii + 1]].id).answer)
               }
               else {
                  mathLogicAnswer += parseFloat(getWidget(widgetNames[data.variables[ii + 1]].id).answer)
               }
            }

            else if (data.operators[ii] === 'minus') {
               if (mathLogicAnswer === undefined) {
                  mathLogicAnswer = parseFloat(current_widget.answer) - parseFloat(getWidget(widgetNames[data.variables[ii + 1]].id).answer)
               }
               else {
                  mathLogicAnswer -= parseFloat(getWidget(widgetNames[data.variables[ii + 1]].id).answer)
               }

            }
            else if (data.operators[ii] === 'multiplies') {
               if (mathLogicAnswer === undefined) {
                  mathLogicAnswer = parseFloat(current_widget.answer) * parseFloat(getWidget(widgetNames[data.variables[ii + 1]].id).answer)
               }
               else {
                  mathLogicAnswer *= parseFloat(getWidget(widgetNames[data.variables[ii + 1]].id).answer)
               }
            }
            else if (data.operators[ii] === 'divided by') {
               const answer = parseFloat(getWidget(widgetNames[data.variables[ii + 1]].id).answer)
               if (mathLogicAnswer === undefined) {
                  mathLogicAnswer = parseFloat(current_widget.answer) / answer
               }
               else {
                  mathLogicAnswer /= answer
               }
            }
            else if ((data.operators[ii] === 'equals') && mathLogicAnswer !== undefined) {
               isTrue = isTrue && (mathLogicAnswer === parseFloat(current_cond));
               mathLogicAnswer = undefined;
            }
            else if ((data.operators[ii + 1] === 'not equals') && mathLogicAnswer !== undefined) {
               isTrue = isTrue && (mathLogicAnswer !== parseFloat(current_cond));
               mathLogicAnswer = undefined;
            }
            else if ((data.operators[ii + 1] === 'less than') && mathLogicAnswer !== undefined) {
               isTrue = isTrue && (mathLogicAnswer < parseFloat(current_cond));
               mathLogicAnswer = undefined;
            }
            else if ((data.operators[ii + 1] === 'less than or equals') && mathLogicAnswer !== undefined) {
               isTrue = isTrue && (mathLogicAnswer <= parseFloat(current_cond));
               mathLogicAnswer = undefined;
            }
            else if ((data.operators[ii + 1] === 'greater than') && mathLogicAnswer !== undefined) {
               isTrue = isTrue && (mathLogicAnswer > parseFloat(current_cond));
               mathLogicAnswer = undefined;
            }
            else if ((data.operators[ii + 1] === 'greater than or equals') && mathLogicAnswer !== undefined) {
               isTrue = isTrue && (mathLogicAnswer >= parseFloat(current_cond));
               mathLogicAnswer = undefined;
            }
         }
      }

      return (data.action === 'visible') ? isTrue : !isTrue
   }
   if (parseEvent === 'set value') {

      const parsedCode = data.split('->').filter((char: string) => char !== '')

      let codeStr = ''
      for (const bit of parsedCode) {
         if (bit.startsWith('$') && bit.endsWith('$')) {
            if (widgetNames[bit.slice(1, -1)]) {
               codeStr += getWidget(widgetNames[bit.slice(1, -1)].id).answer
            }
            else {
               codeStr += `widget.row[idx]['${bit.replaceAll('$', '')}']`
            }
         }
         else if (bit.includes('plus')) {
            codeStr += "+"
         }
         else if (bit.includes('minus')) {
            codeStr += "-"
         }
         else if (bit.includes('multiplies')) {
            codeStr += "*"
         }
         else if (bit.includes('divided')) {
            codeStr += "/"
         }
         else if (bit !== 'equals' && bit !== 'is text') {
            codeStr += bit
         }
      }

      return codeStr.length > 0 ? 'return (' + codeStr + ')' : ''
   }

   return false
}