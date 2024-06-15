import { createTheme } from '@mui/material/styles';

const BaseTheme = createTheme({
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               boxShadow: 'none',
               textTransform: 'none',
               borderRadius: '20px'
            },
         }

      },
      MuiTextField: {
         styleOverrides: {
            root: {

               '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 1.5,
                  borderColor: '#03a9f4'
               },
               '&:focus .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 1.5,
                  borderColor: '#03a9f4'
               },
            }
         },
         variants: [
            {
               props: { variant: 'standard' },
               style: {
                  textTransform: 'none',
                  borderWidth: 0,
               },
            },
         ],
      },

   },
});


export default BaseTheme