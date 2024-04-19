<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useUserStore } from '@/stores/user'

const { setIsLogin } = useUserStore()

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(() => {
  setIsLogin(true)
})
</script>

<template>
  <form @submit="onSubmit" class="grid items-start gap-4 px-4">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>{{ $t('form.username.label') }}</FormLabel>
        <FormControl>
          <Input
            type="text"
            :placeholder="$t('form.username.placeholder')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">{{ $t('form.submit') }}</Button>
  </form>
</template>

<style scoped></style>
