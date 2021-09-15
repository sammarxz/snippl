import React, { 
  useCallback, 
  useEffect, 
  useState, 
  SetStateAction 
} from 'react';
import debounce from 'lodash/debounce';
// import { useToast } from '@chakra-ui/react'

import useSupabase from './useSupabase';

const DEBOUNCE_SAVE_DELAY_MS = 1000;

export function useAutosave<T>(
  dataToSave: T
): [T, React.Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState<T>(dataToSave);
  const {supabase} = useSupabase()
  // const toast = useToast()

  const saveData = useCallback(async newData => {
    setData(newData);
    
    const {error} = await supabase
      .from('snippet')
      .update({ 
        title: newData.title, 
        description: newData.description, 
        code: newData.code, 
        lang: newData.lang,
        updated_at: new Date()
      })
      .eq('id', newData.id)

    // if (!error) {
    //   toast({
    //     title: 'Snippet Saved.',
    //     status: 'success',
    //     variant: 'subtle',
    //     duration: 3000,
    //     isClosable: true,
    //   })
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(async (newData: T) => {
      saveData(newData);
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  useEffect(() => {
    if (data) {
      debouncedSave(data);
    }
  }, [data, debouncedSave]);

  return [data, setData];
}
