<template>
  <va-card class="markup-tables mb-8">
    <va-card class="col-span-12">
      <va-card-title>{{ t('tables.search') }}</va-card-title>
      <va-card-content>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input v-model="name" :placeholder="t('userSearch.username')" />
              <va-button style="margin-right: 0" small @click="search"> search </va-button>
            </div>
          </div>
        </form>
        <va-button color="info" @click="openUserFormModal(null)">add</va-button>
      </va-card-content>
    </va-card>

    <va-card-title>{{ t('tables.basic') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <table class="va-table w-full">
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>创建日期</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <!-- @click="openUserFormModal(user)"-->
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.createTime }}</td>
            <td>
              <va-button color="info" @click="openUserFormModal(user)">编辑</va-button>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card-content>
  </va-card>

  <!--:hideDefaultActions="true"-->
  <!--@close="closeUserFormModal1" 当要监听关闭时候可以使用-->
  <va-modal v-model="isUserFormModalOpen" class="modal-crud" @ok="submitUserForm">
    <user-form v-model:user="user" :initial-user="selectedUser" />
  </va-modal>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import axios from 'axios'
  import { httpGet, httpPost } from '@api'
  import UserForm from './UserForm.vue'
  // 在组件中定义弹出框状态和数据
  const isUserFormModalOpen = ref(false)
  const selectedUser = ref(null)
  const user = ref({}) // 用户数据

  // 在点击行时打开弹出框，并传递数据给 UserForm
  const openUserFormModal = (user) => {
    selectedUser.value = user
    isUserFormModalOpen.value = true
  }

  const { t } = useI18n()
  const name = ref('')

  var users = ref([])
  onMounted(async () => {
    try {
      const response = await httpPost('/queryUser')
      users.value = response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  })

  async function search() {
    var params = {
      nameLike: name.value,
    }
    const response = await httpPost('/queryUser', params)
    users.value = response.data.data
  }

  const submitUserForm = () => {
    var obj = document.getElementById('createTime').value
    console.log(obj)
  }
</script>
