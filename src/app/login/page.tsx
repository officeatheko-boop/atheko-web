"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import axios from "axios";
import Image from "next/image"
import { useRouter } from 'next/navigation'
import {  toast } from 'sonner';
import { getError } from "@/utils/helper"



const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password:z.string()
})


function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
      mode: "onTouched"
    })
  
    const {isSubmitting} = form.formState
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
          const response = await axios.post(`/api/login/`,values)
          if(response.status ===  200){
            toast.success('Login Successful');
            router.push('/admin')
          }         
        }catch(error : unknown){
          console.log(error);
          const message = getError(error)
          toast.error(message);          
        }
    }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <Button type="submit" className="w-full bg-[rgb(180,4,252)]  hover:bg-[rgb(180,4,252)] text-white">
          {isSubmitting ? 
            <Button className=" w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 Please wait
            </Button>
            : "Submit"}
          </Button>
        </form>
      </Form>
      </div>
    </div>
    <div className="hidden bg-muted lg:block">
      <Image
        src="https://res.cloudinary.com/dzvxebtnl/image/upload/v1746549560/atheko/about_us_gdgnxe.jpg"
        alt="Image"
        width="1920"
        height="1080"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
  )
}

export default LoginPage