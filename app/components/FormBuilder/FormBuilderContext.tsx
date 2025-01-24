import React, { createContext, useContext, useState } from 'react';


export type FormField = {

  id: string;
  type: "accordion" | "alert" | "alert-dialog"| "avatar"| "alert"| "badge"| "button"| "card"| "input"| "select";
  label: string;
  value: any;
  options?: string[];
};


interface FormBuilderContextProps {
  formState: {
    fields: FormField[];
  };
  addBlock: (field: FormField) => void;
  setBlocks: (fields: any[]) => void;
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
  const [fields, setBlocks] = useState<FormField[]>([]);

  const addBlock = (field: FormField) => {
    setBlocks((prevFields) => [...prevFields, field]);
  };

  return (
    <FormBuilderContext.Provider value={{ formState: { fields }, addBlock, setBlocks }}>
      {children}
    </FormBuilderContext.Provider>
  );
};
export default FormBuilderProvider;
