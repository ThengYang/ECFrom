import { useState } from "react"
import { Box } from "@mui/material"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
   100: '#DAECFF',
   200: '#b6daff',
   400: '#3399FF',
   500: '#007FFF',
   600: '#0072E5',
   900: '#003A75',
};

const grey = {
   50: '#F3F6F9',
   100: '#E5EAF2',
   200: '#DAE2ED',
   300: '#C1C5CC',
   400: '#B0B8C4',
   500: '#1976D2',
   600: '#6B7A90',
   700: '#434D5B',
   800: '#303740',
   900: '#1C2025',
};

const TextArea = styled(TextareaAutosize)(
   ({ theme }) => `
   display: block;
   box-sizing: border-box;
   resize: none;
   width: 100%;
   font-family: 'IBM Plex Sans', sans-serif;
   font-size: 14px;
   font-weight: 400;
   line-height: 1.5;
   padding: 8px 12px;
   border-radius: 0px;
   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
   background: none;
   border: 1.5px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};


  
   &:hover {
     border-color: #000;
   }
 
   &:focus {
     border-color: ${blue[500]};
     box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
   }
 
   // firefox
   &:focus-visible {
     outline: 0;
   }
 `,
);

interface TextBoxProps {
   placeholder?: string,
   value?: string,
   setValue?: (value: string) => void,
   onFocus?: (value: any) => void,
   onBlur?: (value: any) => void,
   minRows?: number,
   maxRows?: number,
   sx?: any,
   id?: string,
   className?: string,

}

const TextBox = (props: TextBoxProps) => {

   const {
      placeholder = '',
      value = '',
      setValue = (value: string) => void 0,
      onFocus = () => void 0,
      onBlur = () => void 0,
      minRows = 0,
      maxRows = 15,
      sx,
      id = '',
      className = '',
   }
      = props
   return (
      <TextArea
         placeholder={placeholder}
         value={value ? value : ''}
         minRows={minRows}
         maxRows={maxRows}
         onChange={(event: any) => setValue(event.target.value)}
         onFocus={onFocus}
         onBlur={onBlur}
         sx={sx}
         id={id}
         className={className}
      />
   )
}

export default TextBox