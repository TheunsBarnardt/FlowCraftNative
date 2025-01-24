import React from "react";
import { View, Text } from "react-native";
import { useFormBuilder } from "./FormBuilderContext";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react-native";
import { AspectRatio } from "../ui/aspect-ratio";
import { H1 } from "../ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

//https://github.com/mrzachnugent/react-native-reusables/blob/main/apps/showcase/app/card.tsx

const Form = () => {
  const { formState } = useFormBuilder();
  const [checked, setChecked] = React.useState(false);

  return (
    <View>
      {formState.fields.map((field) => (
        <View key={field.id}>
          <Text>{field.label}</Text>
          {field.type === "input" && <Input value={String(field.value)} />}{" "}
          {/* Cast to string */}
          {field.type === "select" && (
            <Select
              defaultValue={{
                value: String(field.value), // Ensure value is a string
                label: field.label,
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue
                  className="text-foreground text-sm native:text-lg"
                  placeholder={field.label}
                />
              </SelectTrigger>
              <SelectContent className="w-[250px]">
                <SelectGroup>
                  {field.options?.map((option: string) => (
                    <SelectItem key={option} label={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {field.type === "checkbox" && (
            
            <View className='flex-row gap-3 items-center'>
            <Checkbox aria-labelledby='terms' checked={checked} onCheckedChange={setChecked} />
            <Label nativeID='terms' onPress={() => setChecked((prev) => !prev)}>
              Accept terms and conditions
            </Label>
          </View>
          )}
          {field.type === "alert-dialog" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Text>Show Alert Dialog</Text>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
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
          )}
          {field.type === "alert" && (
            <Alert icon={Terminal} className="max-w-xl">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can use a terminal to run commands on your computer.
              </AlertDescription>
            </Alert>
          )}
          {field.type === "aspect-ratio" && (
            <AspectRatio ratio={16 / 9}>
              <View className="bg-blue-500 h-full w-full rounded-lg justify-center items-center">
                <H1 className="text-white">16:9</H1>
              </View>
            </AspectRatio>
          )}
          {field.type === "avatar" && (
            <Avatar alt="Zach Nugent's Avatar">
              <AvatarImage
                source={{ uri: "https://github.com/mrzachnugent.png" }}
              />
              <AvatarFallback>
                <Text>ZN</Text>
              </AvatarFallback>
            </Avatar>
          )}
          {field.type === "badge" && (
            <Badge>
              <Text>Default</Text>
            </Badge>
          )}
          {field.type === "button" && (
            <Button>
              <Text>Default</Text>
            </Button>
          )}
          {field.type === "card" && (
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Card Content</Text>
              </CardContent>
              <CardFooter>
                <Text>Card Footer</Text>
              </CardFooter>
            </Card>
          )}
        </View>
      ))}
    </View>
  );
};

export default Form;
