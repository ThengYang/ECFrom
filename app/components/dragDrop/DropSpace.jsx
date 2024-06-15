import React from "react";
import { useDrop } from 'react-dnd'
import { dragableWidgets } from '../../constants/DropAcceptable'


const DropSpace = ({ children }) => {


   const [{ }, drop] = useDrop(
      () => ({
         accept: dragableWidgets,
         drop(item, monitor) { },
      }),
      [])

   return (
      <div ref={drop}>
         {children}
      </div>
   )
}

export default DropSpace
