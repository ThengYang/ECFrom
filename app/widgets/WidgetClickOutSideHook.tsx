import { useEffect, useRef } from 'react';

const useOutsideClick = (callback: (event: any) => void) => {
   const ref = useRef<any>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            callback(event);
         }
      };

      document.addEventListener('mouseup', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);

      return () => {
         document.removeEventListener('mouseup', handleClickOutside);
         document.removeEventListener('touchend', handleClickOutside);
      };
   }, [callback]);

   return ref;
};

export default useOutsideClick
