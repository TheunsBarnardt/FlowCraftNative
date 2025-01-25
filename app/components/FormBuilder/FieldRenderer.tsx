import React from 'react';
import InputBlock from '../Blocks/InputBlock';
import SelectBlock from '../Blocks/SelectBlock';
import VStackBlock from '../Blocks/VStackBlock';
import HStackBlock from '../Blocks/HStackBlock';

interface Field {
  id: string;
  type: string;
  label: string;
  value: any;
  options?: string[];
  children?: Field[];
}

const FieldRenderer: React.FC<{ field: Field }> = ({ field }) => {
  switch (field.type) {
    case 'input':
      return <InputBlock label={field.label} value={String(field.value)} />;
    case 'select':
      return (
        <SelectBlock
          label={field.label}
          value={String(field.value)}
          options={field.options || []}
        />
      );
    case 'vstack':
      return (
        <VStackBlock>
          {field.children?.map((child) => (
            <FieldRenderer key={child.id} field={child} />
          ))}
        </VStackBlock>
      );
    case 'hstack':
      return (
        <HStackBlock>
          {field.children?.map((child) => (
            <FieldRenderer key={child.id} field={child} />
          ))}
        </HStackBlock>
      );
    default:
      return null;
  }
};

export default FieldRenderer;