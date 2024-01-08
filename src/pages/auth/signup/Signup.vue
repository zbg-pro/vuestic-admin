<template>
  <form @submit.prevent="onsubmit()">
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
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :error-messages="agreedToTermsErrors"
      >
        <template #label>
          <span class="ml-2">
            {{ t('auth.agree') }}
            <span class="va-link">{{ t('auth.termsOfUse') }}</span>
          </span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">
        {{ t('auth.recover_password') }}
      </router-link>
    </div>

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.sign_up') }}</va-button>
    </div>
  </form>
  <va-alert v-model="isCloseableAlertVisible" class="w-full" color="info" closeable> 注册成功 </va-alert>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import axios from 'axios'
  import md5 from 'crypto-js/md5'

  const { t } = useI18n()
  const isCloseableAlertVisible = ref(false)
  const email = ref('')
  const password = ref('')
  const agreedToTerms = ref(false)
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const agreedToTermsErrors = ref<string[]>([])
  localStorage.clear()
  const router = useRouter()

  /*const formReady = computed(() => {
    return !(emailErrors.value.length || passwordErrors.value.length || agreedToTermsErrors.value.length)
  })*/

  async function onsubmit() {
    //if (!formReady.value) return
    const recoverPasswordText = t('auth.recover_password')
    console.log(recoverPasswordText)

    emailErrors.value = email.value ? [] : ['Email is required']
    passwordErrors.value = password.value ? [] : ['Password is required']
    agreedToTermsErrors.value = agreedToTerms.value ? [] : ['You must agree to the terms of use to continue']

    if (emailErrors.value.length > 0 || passwordErrors.value.length > 0 || agreedToTermsErrors.value.length > 0) {
      return
    }

    if (password.value.length < 8) {
      passwordErrors.value = ['密码长度不能小于8位']
      return
    }
    if (email.value.length < 5) {
      emailErrors.value = ['账户名长度不能小于5位']
      return
    }

    try {
      var params = {
        name: email.value,
        password: password.value,
      }
      var encryptedText = md5(params.password).toString()
      params.password = encryptedText

      const response = await axios.post(import.meta.env.VITE_BACKEND_VIP_DOMAIN + '/AddUser', params)
      console.log('请求完成')
      console.log('response.data', response.data)

      if (response.data.code != 10000) {
        emailErrors.value = [response.data.message]
        passwordErrors.value = [response.data.message]
        return
      }
      isCloseableAlertVisible.value = true
      localStorage.clear()
      //router.push({ name: 'login' })

      // 处理成功后的逻辑
    } catch (error) {
      console.error('Error:', error)
      // 处理错误的逻辑
    }
  }
</script>
