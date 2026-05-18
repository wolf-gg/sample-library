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
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import useSWRMutation from "swr/mutation"
import { LoginUserDto } from "common/dto/login"
import { toast } from "sonner"
import { ServerError } from "common/dto/error"

const formSchema = z.object({
  username: z.string().nonempty("Username must not be empty"),
})

type Form = z.infer<typeof formSchema>

export const LoginForm: React.FC = () => {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  const loginUser = useSWRMutation(
    "login-user",
    async (_, { arg }: { arg: LoginUserDto }) => {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      })

      const responseData = await response.json()

      if (response.ok === false) {
        throw responseData as ServerError
      }

      return response.json()
    },
    {
      throwOnError: false,
    }
  )

  const onSubmit = (data: Form) => {
    loginUser.trigger(data, {
      onError: (error: ServerError) => {
        form.reset()
        toast.error(error.message)
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Login</h2>
        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="login-username">Username</FieldLabel>
                <Input {...field} id="login-username" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end">
          <Button disabled={loginUser.isMutating} type="submit">
            Login
          </Button>
        </div>
      </div>
    </form>
  )
}
