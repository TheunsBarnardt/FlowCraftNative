import React from 'react';
import {  View } from 'react-native';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';


const AlertDialogBlock = ({ label }: { label: string;  }) => (
  <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant='outline'>
      <Text>Show Alert Dialog</Text>
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account and remove
        your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>
        <Text>Cancel</Text>
      </AlertDialogCancel>
      <AlertDialogAction>
        <Text>Continue</Text>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
);

export default AlertDialogBlock;
