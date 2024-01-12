<template>
  <va-card class="col-span-12">
    <va-card-title>{{ editing ? '编辑用户' : '添加用户' }}</va-card-title>
    <va-card-content>
      <form>
        <div class="grid grid-cols-12 gap-6">
          <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
            <va-input id="username" v-model="user.name" class="mb-8" label="name" />
          </div>
          <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
            <va-input id="age" v-model="user.age" class="mb-8" label="age" />
          </div>
          <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
            <va-date-input id="createTime" v-model="user.createTime" label="createTime" />
          </div>
        </div>
        <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
          <!-- 其他组件内容 -->
          <DatePicker
            v-model="selectedDate"
            style="border: 1px solid #1da1f2; z-index: 1000; background-color: #dddddd"
          />eeee
        </div>
      </form>
    </va-card-content>
  </va-card>
</template>

<script setup>
  import { ref, defineProps, onMounted } from 'vue'
  import DatePicker from 'vue3-datepicker'

  // 在 ref 中定义一个变量来保存选择的日期
  const selectedDate = ref(new Date())

  // eslint-disable-next-line vue/no-setup-props-destructure
  const { initialUser } = defineProps(['initialUser'])
  const user = ref({ ...initialUser })
  const editing = ref(!!initialUser)
  console.log('editing2', editing.value)
</script>
