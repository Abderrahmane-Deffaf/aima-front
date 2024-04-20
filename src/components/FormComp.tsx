"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

export function FormComp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptom1: "",
      symptom2: "",
      symptom3: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }d

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full bg-black/50  p-8 rounded-lg ">
        <FormField
          control={form.control}
          name="symptom1"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-bold text-2xl">
                Symptome One
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className=" bg-white">
                  <SelectTrigger>
                    <SelectValue placeholder="Select symptome One" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className=" bg-white">
                  <SelectTrigger>
                    <SelectValue placeholder="Select symptome Two" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className=" bg-white">
                  <SelectTrigger>
                    <SelectValue placeholder="Select symptome Three" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
        <Button
          type="submit"
          className=" w-full py-2   bg-[#337357] font-bold  text-lg hover:bg-[#337357]/90 hover:border hover:border-white hover:border-dashed "
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
