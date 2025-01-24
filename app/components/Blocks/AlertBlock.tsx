import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react-native';


const AlertBlock = ({ title, description }: { title: string; description: string }) => (
  <Alert icon={Terminal} className='max-w-xl'>
  <AlertTitle>{title}</AlertTitle>
  <AlertDescription>
    {description}
  </AlertDescription>
</Alert>
);

export default AlertBlock;
