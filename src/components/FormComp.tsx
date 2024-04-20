"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import viursIcon from "@/assets/virus-icon.png";
import treatment from "@/assets/treatment.png";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Image from "next/image";

const list1: [string, ...string[]] = [
  "Brown spots on leaves",
  "Holes in leaves",
  "Curled leaves",
  "Mushy stems",
  "White powdery mildew on leaves",
  "Sooty mold on leaves",
  "Yellowing leaves with green veins",
  "Brown spots on fruits",
  "Wilting during hot weather",
  "Yellowing leaves with brown edges",
  "Scorched leaves",
  "Deformed leaves",
  "Slow growth",
];

const list2: [string, ...string[]] = [
  "Circular lesions",
  "Chewing marks",
  "Distorted growth",
  "Waterlogged soil",
  "Presence of scale insects",
  "Cracking or rotting fruits",
  "Dry soil",
  "Soggy soil",
  "Sunburn marks",
  "Presence of weeds",
  "Poor soil quality",
  "Insufficient sunlight",
];
const list3: [string, ...string[]] = [
  "Wilting",
  "Leaf drop",
  "Leaf curl",
  "Mosaic pattern on leaves",
  "Leaf yellowing",
  "Sticky leaves",
  "Mushy fruit texture",
  "Leaf drop",
  "Stunted growth",
  "Yellowing leaves",
  "Pale leaves",
];

const formSchema = z.object({
  symptom1: z.enum(list1),
  symptom2: z.enum(list2),
  symptom3: z.enum(list3),
});

type ResponseType = {
  title: string;
  description: string;
  treatment: string;
};

export function FormComp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptom1: "",
      symptom2: "",
      symptom3: "",
    },
  });

  const [response, setResponse] = useState<ResponseType | undefined>();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://127.0.0.1:8000/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data?.error) {
        console.log(data);
        setResponse(data);
      }
      if (data) {
        console.log(data);
        setResponse(data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }
  function onError(errors: any) {
    console.log(errors);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-8 w-full bg-black/50  p-8 rounded-lg "
        >
          <FormField
            control={form.control}
            name="symptom1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-bold text-2xl">
                  Symptome One
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className=" bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Select symptome One" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" max-h-[10rem]">
                    {list1.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="symptom2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-bold text-2xl">
                  Symptome Two
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className=" bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Select symptome Two" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" max-h-[10rem]">
                    {list2.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="symptom3"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-bold text-2xl">
                  Symptome Three
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className=" bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Select symptome Three" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" max-h-[10rem]">
                    {list3.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Drawer>
            <DrawerTrigger
              type="submit"
              className=" w-full py-2   bg-[#337357] font-bold  text-lg hover:bg-[#337357]/90  hover:outline-1 border-none outline-none  hover:outline-white hover:outline-dashed rounded-lg "
            >
              See Results
            </DrawerTrigger>
            {response?.title && (
              <DrawerContent className="h-[30rem]  bg-[#FBFADA]">
                <DrawerHeader className=" text-center space-y-8 mx-auto max-w-[700px] p-4 ">
                  <div className=" space-y-4">
                    <h2 className=" flex items-center  text-3xl space-x-2 font-bold  ">
                      <Image
                        src={viursIcon}
                        alt="virus icon"
                        width={50}
                        height={50}
                      />
                      <span>{response.title}</span>
                    </h2>
                    <DrawerDescription>
                      {response.description}
                    </DrawerDescription>
                  </div>
                  <div className=" space-y-4">
                    <h2 className="flex items-center space-x-2 font-bold text-xl">
                      <Image
                        src={treatment}
                        alt="treatment icon"
                        width={50}
                        height={50}
                      />
                      <span>Treatment</span>
                    </h2>
                    <DrawerDescription>{response.treatment}</DrawerDescription>
                  </div>
                </DrawerHeader>
              </DrawerContent>
            )}
            {!response?.title && (
              <DrawerContent className="h-[30rem]  bg-[#FBFADA]">
                <DrawerHeader className=" text-center space-y-8 mx-auto max-w-[700px] p-4 ">
                  <DrawerTitle className=" text-3xl space-x-2 font-bold  ">
                    No Results Found
                  </DrawerTitle>
                </DrawerHeader>
              </DrawerContent>
            )}
          </Drawer>
        </form>
      </Form>
    </>
  );
}
