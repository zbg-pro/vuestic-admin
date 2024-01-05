<template>
  <va-card class="markup-tables mb-8">
    <va-card-title>{{ t('tables.basic') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <table class="va-table w-full">
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
          </tr>
        </thead>

        <tbody>
          <!--        <tr>
          <td>zhang三</td><td>12</td>
        </tr>
        <tr>
          <td>李四</td><td>22</td>
        </tr>-->

          <tr v-for="user in users" :key="user.id">
            <td>{{ user.first_name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import axios from 'axios'

  const { t } = useI18n()
  var params = {
    per_page: 10,
    page: 1,
  }

  console.log('1--' + import.meta.env.VITE_APP_GTM_KEY1)
  console.log('2--' + import.meta.env.DEV)
  console.log('3--' + import.meta.env.VITE_BACKEND_API_DOMAIN)
  console.log('4--' + import.meta.env.VITE_BACKEND_VIP_DOMAIN)

  console.log(222)
  var users = ref([])
  onMounted(async () => {
    try {
      console.log(111)
      const response = await axios.get('https://reqres.in/api/users', { params })
      users.value = response.data.data
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  })
</script>
