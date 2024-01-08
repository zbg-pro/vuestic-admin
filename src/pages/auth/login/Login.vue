<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      class="mb-4"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      class="mb-4"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options flex items-center justify-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="t('auth.keep_logged_in')" />
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
        t('auth.recover_password')
      }}</router-link>
    </div>

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import axios from 'axios' //原始用法
  import { httpGet, httpPost } from '@api'
  import md5 from 'crypto-js/md5'

  const { t } = useI18n()
  localStorage.removeItem('token')
  localStorage.clear()

  const email = ref('')
  const password = ref('')
  const keepLoggedIn = ref(false)
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const router = useRouter()

  //const formReady = computed(() => !emailErrors.value.length && !passwordErrors.value.length)

  async function onsubmit() {
    //if (!formReady.value) return
    console.log('email:', email.value)
    console.log('password:', password.value)
    console.log('4--' + import.meta.env.VITE_BACKEND_VIP_DOMAIN)

    emailErrors.value = email.value ? [] : ['Email is required']
    passwordErrors.value = password.value ? [] : ['Password is required']

    if (emailErrors.value.length > 0 || passwordErrors.value.length > 0) {
      return
    }

    //router.push({ name: 'dashboard' }) //这个直接转到dashboard页面 ==》http://127.0.0.1:1111/admin/dashboard

    var params = {
      name: email.value,
      password: password.value,
    }

    var encryptedText = md5(params.password).toString()
    params.password = encryptedText
    console.log('password2:', encryptedText)

    try {
      //const response = await axios.post(import.meta.env.VITE_BACKEND_VIP_DOMAIN + '/login', params)
      const response = await axios.post(import.meta.env.VITE_BACKEND_VIP_DOMAIN + '/login', params)
      console.log('请求完成')
      console.log('response.data', response.data)

      if (response.data.code != 10000) {
        emailErrors.value = [response.data.message]
        passwordErrors.value = [response.data.message]
        return
      }
      console.log(response.data.data.token)

      // 存储token
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('uid', response.data.data.uid)
      router.push({ name: 'dashboard' })
      // 处理成功后的逻辑
    } catch (error) {
      console.error('Error:', error)
      // 处理错误的逻辑
    }
  }
</script>
