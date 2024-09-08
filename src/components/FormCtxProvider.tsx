"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

type FormContextType = {
  formData: { [key: string]: string };
  update: (field: string, value: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormCtx = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('error!');
  }
  return context;
};

export const FormCtxProvider = ({ children }: Props) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    username: '',
    email: '',
    hobby: ''
  });

  const update = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    broadcastData(field, value);
  };

  const broadcastData = (field: string, value: string) => {
    const channel = new BroadcastChannel('form_sync');
    channel.postMessage({ field, value });
    channel.close();
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }

    const channel = new BroadcastChannel('form_sync');
    channel.onmessage = (event: MessageEvent) => {
      const { field, value } = event.data;
      setFormData(prevFormData => ({
        ...prevFormData,
        [field]: value
      }));
    };

    return () => channel.close();
  }, []);

  return (
    <FormContext.Provider value={{ formData, update }}>
      {children}
    </FormContext.Provider>
  );
};
