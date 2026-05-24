"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "client/libs/shadcn/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "client/libs/shadcn/field"
import { Input } from "client/libs/shadcn/input"
import { ServerError } from "common/dto/error"
import { CreateUserDto } from "common/dto/user"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import useSWRMutation from "swr/mutation"
import z from "zod"

const formSchema = z.object({
  username: z.string().nonempty("Username must not be empty"),
  firstName: z.string().nonempty("First name must not be empty"),
  lastName: z.string().nonempty("Last name must not be empty"),
})

type Form = z.infer<typeof formSchema>

export const RegisterForm: React.FC = () => {
  const router = useRouter()

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", firstName: "", lastName: "" },
  })

  const registerUser = useSWRMutation(
    "register-user",
    async (_, { arg }: { arg: CreateUserDto }) => {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new ServerError(responseData)
      }

      return responseData
    }
  )

  const onSubmit = async (data: Form) => {
    try {
      await registerUser.trigger(data)
      form.reset()
      toast.success("Registration successful")
      router.push("/login")
    } catch (error) {
      if (ServerError.validate(error)) {
        form.reset()
        toast.error(error.message)
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Register</h2>
        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="register-username">Username</FieldLabel>
                <Input {...field} id="register-username" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="register-firstname">First Name</FieldLabel>
                <Input {...field} id="register-firstname" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="register-lastname">Last Name</FieldLabel>
                <Input {...field} id="register-lastname" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end">
          <Button disabled={registerUser.isMutating} type="submit">
            Register
          </Button>
        </div>
      </div>
    </form>
  )
}
