'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Loader2  , Trash2 } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Service_ } from "@/types/type"
  
  import { z } from "zod"
  import { Roboto  , Inter} from 'next/font/google';


  const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], 
    });
  
  const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });
  


const formSchema = z.object({
  serviceName: z.string().min(2, {
    message: "Service Name must be at least 2 characters.",
  }),
  servicePoints: z.array(z.string()),
  serviceDescription: z.string().min(15, {
    message: "Service Name must be at least 15 characters.",
  }),
  serviceImage: z
  .custom<File>((file) => file instanceof File, {
    message: "Service Image is required.",
  }),
  serviceBanner: z
  .custom<File>((file) => file instanceof File, {
    message: "Service Banner Image is required.",
  })

})

interface AddServiceModalProps {
  isopen: boolean; 
  onClose: () => void; 
  onSubmit: (data: Service_) => void; 
}

function AddServiceModal( {isopen , onClose , onSubmit}: AddServiceModalProps) {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serviceName: "",
        },
        mode: "onTouched"
    })
    const {isSubmitting} = form.formState 

    const [pointInput, setPointInput] = React.useState("");
    const [points, setPoints] = React.useState<string[]>([]);

    React.useEffect(() => {
      form.setValue("servicePoints", points);
    }, [points, form]);

    const handleSubmitButton = (values: z.infer<typeof formSchema>) => {
        onSubmit(values)         
    }

    // console.log(points);
    

  return (

    <div className=" flex justify-end  mb-4" >   
    <AlertDialog open={isopen} onOpenChange={onClose}>
    <AlertDialogTrigger asChild>
    </AlertDialogTrigger>
    <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
      <AlertDialogHeader>
        <AlertDialogTitle className={`${inter.className} `} >Create a new service?</AlertDialogTitle>
        <AlertDialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitButton)} className="space-y-8">
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${roboto.className} text-black `} >Service Name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${roboto.className} text-black `} >Service Description</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="servicePoints"
              render={({ }) => (
                <FormItem>
                  <FormLabel className={`${roboto.className} text-black `} >Service Points</FormLabel>
                  <FormControl>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        value={pointInput}
                        onChange={(e) => setPointInput(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          if (pointInput.trim()) {
                            setPoints([...points, pointInput.trim()]);
                            setPointInput("");
                          }
                        }}
                      >
                        Add Point
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                <ul className="mt-2 space-y-1">
                  {points.map((point, idx) => (
                    <li key={idx} className="flex justify-between items-center border p-2 rounded">
                      <span>{point}</span>
                      <Trash2
                        className="w-4 h-4 text-red-500 cursor-pointer"
                        onClick={() => {
                          setPoints(prev => prev.filter((_, i) => i !== idx));
                        }}
                      />
                    </li>
                  ))}
                </ul>


            <FormField
              control={form.control}  
              name="serviceImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${roboto.className} text-black `} >Service Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*"  
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}  
              name="serviceBanner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${roboto.className} text-black `} >Service Banner Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*"  
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <Button type="submit" className="w-full bg-[rgb(180,4,252)]  ">
          {isSubmitting ? 
            <Button className=" w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button>
            : "Submit"}
          </Button>

          </form>
        </Form>

        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose} className="w-full" >Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
  )
}

export default AddServiceModal