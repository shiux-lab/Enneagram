<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField } from '@/components/ui/form'
import { transformI18n } from '@/plugins/i18n'

import { useUserStore } from '@/stores/user'

const { setIsLogin } = useUserStore()

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, transformI18n('form.username.min'))
      .max(50, transformI18n('form.username.max'))
  })
)

const form = useForm({
  validationSchema: formSchema
})

// #TODO 建议提交后，关闭弹窗
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
          <Input type="text" :placeholder="transformI18n('form.username.placeholder')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">{{ transformI18n('form.submit') }}</Button>
  </form>
</template>
