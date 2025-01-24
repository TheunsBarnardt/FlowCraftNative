import React from "react";
import InputBlock from "../Blocks/InputBlock";
import SelectBlock from "../Blocks/SelectBlock";
import CheckboxBlock from "../Blocks/CheckboxBlock";
import AccordionBlock from "../Blocks/AccordionBlock";
import AlertBlock from "../Blocks/AlertBlock";
import AlertDialogBlock from "../Blocks/AlertDialogBlock";
import AvatarBlock from "../Blocks/AvatarBlock";
import BadgeBlock from "../Blocks/BadgeBlock";
import ButtonBlock from "../Blocks/ButtonBlock";
import CardBlock from "../Blocks/CardBlock";

//https://github.com/mrzachnugent/react-native-reusables/blob/main/apps/showcase/app/data-table.tsx

const FieldRenderer = ({
  field,
}: {
  field: {
    id: string;
    type: string;
    label: string;
    value: any;
    options?: string[];
  };
}) => {
  switch (field.type) {
    case "accordion":
      return <AccordionBlock label={field.label} />;
    case "alert":
      return <AlertBlock title={field.label} description={field.value} />;
    case "alert-dialog":
      return <AlertDialogBlock label={field.label} />;
    case "avatar":
      return <AvatarBlock label={field.label} />;
    case "badge":
      return <BadgeBlock label={field.label} />;
    case "button":
      return <ButtonBlock label={field.label} />;
    case "card":
      return <CardBlock label={field.label} />;
    case "input":
      return <InputBlock label={field.label} value={String(field.value)} />;
    case "select":
      return (
        <SelectBlock
          label={field.label}
          value={String(field.value)}
          options={field.options || []}
        />
      );
    // Add other cases for field types
    default:
      return null;
  }
};

export default FieldRenderer;
