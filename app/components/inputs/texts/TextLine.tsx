import { TextField } from "@mui/material";

import styles from "./Text.module.css";
import { useState } from "react";

interface TextLineProps {
   placeholder?: string
   value?: string
   required?: boolean
   setValue?: (val: string) => void
   onFocus?: (event: any) => void
   onBlur?: (event: any) => void
   type?: 'text' | 'number' | 'phone' | 'email'
   sx?: any
   style?: any
   id?: string
   className?: string
   variant?: string
}

const TextLine = (props: TextLineProps) => {

   const {
      placeholder = '',
      value = '',
      type = 'text',
      required = false,
      setValue = () => void 0,
      onFocus = () => void 0,
      onBlur = () => void 0,
      sx = null,
      style = null,
      id = '',
      className = '',
      variant = 'under'
   } = props

   const [error, setError] = useState(false)
   const [helperText, setHelperText] = useState('')

   const validateEmail = (email: string) => {
      return email.toLowerCase().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   };

   const formatPhone = (eventValue: string) => {
      const conCodeIndex = eventValue.length <= 13 ? 2 : (eventValue.length - 13) + 2;
      const initCode = eventValue[0] === '+' ? eventValue.substring(0, conCodeIndex) : '';

      let cleaned = initCode ? ('' + eventValue.substring(conCodeIndex)).replace(/\D/g, '') : ('' + eventValue).replace(/\D/g, '')

      if (cleaned.match(/(\d{3})(\d{3})(\d{4})/)) {
         cleaned = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      }
      else if (cleaned.match(/(\d{3})(\d{3})/)) {
         cleaned = cleaned.replace(/(\d{3})(\d{3})/, '($1) $2')
      }
      else if (cleaned.match(/(\d{4})/)) {
         cleaned = cleaned.replace(/(\d{3})/, '($1)')
      }

      cleaned = initCode + cleaned;
      return cleaned;
   }

   const handleSetValue = (event: any) => {
      if (type === 'phone') {
         const eventValue = event.target.value.replace(/[()\\s-]+/g, '');
         if ((eventValue[0] === '+' && eventValue.length < 16) || eventValue.length < 12)
            setValue(formatPhone(eventValue))
      }
      else {
         setValue(event.target.value)
      }
   }

   const handleOnFocus = (event: any) => {
      setError(false)
      setHelperText('')
      onFocus(event)
   }

   const handleOnBlur = (event: any) => {
      if (type === 'email') {
         const is_error = !validateEmail(value)
         is_error ? setHelperText("Please enter a valid email address.") : setHelperText('')
         setError(is_error)
      }
      if (required && value === '') {
         setError(true)
         setHelperText("Please fill this field.")
      }
      onBlur(event);
   }

   return (
      <TextField
         placeholder={placeholder}
         value={value}
         type={type}
         sx={sx}
         onFocus={handleOnFocus}
         onChange={handleSetValue}
         onBlur={handleOnBlur}
         variant={variant === 'inline' ? "standard" : 'outlined'}
         className={styles.number}
         size="small"
         InputProps={{
            sx: {
               borderRadius: '5px',
            },

         }}
         inputProps={{
            sx: style,
            id: id,
            className: className,
         }}
         error={error}
         helperText={helperText}
      />
   )
}

export default TextLine