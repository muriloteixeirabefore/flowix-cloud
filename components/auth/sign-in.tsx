import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { H4 } from '@/components/ui/h4'
import { Input, PasswordInput } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ThemeSwitcher } from '../theme-switcher'

const loginSchema = z.object({
  login: z.string(),
  // .min(4, 'Mínimo 4 caracteres')
  // .max(24, 'Máximo 24 caracteres'),
  password: z.string(),
  // .min(6, 'Mínimo 6 caracteres')
  // .max(64, 'Máximo 64 caracteres'),
})

export function SignIn() {
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  async function handleSignIn(data: z.infer<typeof loginSchema>) {
    await signIn('credentials', {
      username: data.login,
      password: data.password,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        form.setError('login', {
          type: 'manual',
          message: 'Credenciais inválidas',
        })

        form.setError('password', {
          type: 'manual',
          message: 'Credenciais inválidas',
        })
      } else {
        router.replace('/')
      }
    })
  }

  return (
    <>
      <div className="fixed top-0 z-50 flex h-16 w-full justify-end bg-inherit px-5 py-3">
        <ThemeSwitcher />
      </div>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden h-screen gap-6 bg-muted text-sm lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
          <Image
            priority={true}
            src="/logo-flowix.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-auto w-auto object-cover"
          />
          Copyright © 2024
          <br />
          Todos os direitos reservados
          <Image
            priority={true}
            src="/logo-before-sm.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-auto w-auto object-cover"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <H4>LOGIN</H4>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignIn)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="login"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <PasswordInput {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="my-4 w-full">
                    Login
                  </Button>
                  <Link href="/cloud">
                    <Button variant="outline" className="my-4 w-full">
                      Painel
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
