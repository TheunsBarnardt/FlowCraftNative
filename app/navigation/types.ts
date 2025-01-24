// app/navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  FormBuilder: undefined; // No parameters for FormBuilder screen
};

export type FormBuilderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FormBuilder'>;
