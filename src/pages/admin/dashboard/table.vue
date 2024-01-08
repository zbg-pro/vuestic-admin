<template>
  <va-card class="markup-tables mb-8">
    <va-card class="col-span-12">
      <va-card-title>{{ t('tables.search') }}</va-card-title>
      <va-card-content>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input v-model="simple" :placeholder="t('userSearch.username')" />
              <va-button style="margin-right: 0" small @click="onsubmit"> search </va-button>
            </div>
          </div>
        </form>
      </va-card-content>
    </va-card>
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
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
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
  import { httpGet, httpPost } from '@api'

  const { t } = useI18n()
  const simple = ref('')
  var params = {
    /*per_page: 10,
    page: 1,*/
  }

  var users = ref([])
  onMounted(async () => {
    try {
      const response = await httpPost('/queryUser')
      users.value = response.data.data
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  })

  async function onsubmit() {
    alert(1)
  }
</script>
