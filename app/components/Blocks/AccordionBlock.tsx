import React from 'react';
import {  View } from 'react-native';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';


const AccordionBlock = ({ label }: { label: string;}) => (
  <Accordion
  type='multiple'
  collapsible
  defaultValue={['item-1']}
  className='w-full max-w-sm native:max-w-md'
>
  <AccordionItem value='item-1'>
    <AccordionTrigger>
      <Text>Is it accessible?</Text>
    </AccordionTrigger>
    <AccordionContent>
      <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value='item-2'>
    <AccordionTrigger>
      <Text>What are universal components?</Text>
    </AccordionTrigger>
    <AccordionContent>
      <Text>
        In the world of React Native, universal components are components that work on both
        web and native platforms.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value='item-3'>
    <AccordionTrigger>
      <Text>Is this component universal?</Text>
    </AccordionTrigger>
    <AccordionContent>
      <Text>Yes. Try it out on the web, iOS, and/or Android.</Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>
);

export default AccordionBlock;
