<template>
  <va-card class="markup-tables mb-8">
    <va-card-title>{{ t('tables.basic') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <table class="va-table w-full">
        <thead>
          <tr>
            <th>{{ t('tables.headings.name') }}</th>
            <th>{{ t('tables.headings.email') }}</th>
            <th>{{ t('tables.headings.country') }}</th>
            <th>{{ t('tables.headings.status') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.country }}</td>
            <td>
              <va-badge :text="user.status" :color="getStatusColor(user.status)" />
            </td>
          </tr>
        </tbody>
      </table>
    </va-card-content>
  </va-card>

  <va-card>
    <va-card-title>{{ t('tables.stripedHoverable') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <table class="va-table va-table--striped va-table--hoverable w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.country }}</td>
            <td>
              <va-badge :text="user.status" :color="getStatusColor(user.status)" />
            </td>
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
  import data from '../../../../../data/tables/markup-table/data.json'

  const { t } = useI18n()

  const params = {
    per_page: 1,
    page: 10,
  }
  var users = ref(data.slice(0, 8))

  /*
axios.get('https://reqres.in/api/users', { params }).then((response) => {
  users = response.data.data
  console.log(users)
  //params.totalPages = response.data.total_pages
  //this.loading = false
})
*/

  onMounted(async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users', { params })
      users.value = response.data.data
      console.log(users.value)
      // params.totalPages = response.data.total_pages
      // this.loading = false
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  })

  function getStatusColor(status: string) {
    if (status === 'paid') {
      return 'success'
    }

    if (status === 'processing') {
      return 'info'
    }

    return 'danger'
  }
</script>
