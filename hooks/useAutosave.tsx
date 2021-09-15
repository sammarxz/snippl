import React, { 
  useCallback, 
  useEffect, 
  useState, 
  SetStateAction 
} from "react";
import debounce from 'lodash/debounce';

import useSupabase from "./useSupabase";

const DEBOUNCE_SAVE_DELAY_MS = 3000;

export function useAutosave<T>(
  dataToSave: T
): [T, React.Dispatch<SetStateAction<T>>] {
  // This UI state mirrors what's in the database.
  const [data, setData] = useState<T>(dataToSave);
  const {supabase} = useSupabase()

  const saveData = useCallback(async newData => {
    setData(newData);
    
    const { error } = await supabase
    .from('snippet')
    .update({ 
      title: newData.title, 
      description: newData.description, 
      code: newData.code, 
      lang: newData.lang, 
    })
    .eq('id', newData.id)
    
    if(!error) {
      console.log("Saved successfully!");
      console.log(newData)
    }
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
