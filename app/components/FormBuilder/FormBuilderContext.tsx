import React, { createContext, useContext, useState } from 'react';

interface FormField {
  id: string;
  type: string;
  label: string;
  value: string | boolean | string[];
  options?: string[];
}

interface FormBuilderContextProps {
  formState: {
    fields: FormField[];
  };
  addField: (field: FormField) => void;
  setFields: (fields: any[]) => void;
}

const FormBuilderContext = createContext<FormBuilderContextProps | undefined>(undefined);

export const useFormBuilder = (): FormBuilderContextProps => {
  const context = useContext(FormBuilderContext);
  console.log("FormBuilderContext", context); // Debugging line
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};

const FormBuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = (field: FormField) => {
    setFields((prevFields) => [...prevFields, field]);
  };

  return (
    <FormBuilderContext.Provider value={{ formState: { fields }, addField, setFields }}>
      {children}
    </FormBuilderContext.Provider>
  );
};
export default FormBuilderProvider;
