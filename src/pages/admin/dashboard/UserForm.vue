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
            <label for="createTime">Create Time:</label>
            <!--            <label>createTime:</label>-->
            <input
              id="createTime"
              type="datetime-local"
              :value="user.createTime"
              style="
                width: 120%;
                padding: 0.375rem;
                border: 1px solid #6fa0da;
                border-radius: 10px;
                margin-bottom: 2rem; /* 表示元素底部的外边距为1个根元素的字体大小（rem 单位）。rem 单位通常是相对于根元素（html 元素）的字体大小来计算的。*/
              "
              @input="updateCreateTime"
              @click="aaa"
            />
          </div>
        </div>
      </form>
    </va-card-content>
  </va-card>
</template>

<script setup>
  import { ref, defineProps, onMounted, watch, toRef } from 'vue'
  import DatePicker from 'vue3-datepicker'
  import { aaa } from './a.js'

  aaa()
  // 在 ref 中定义一个变量来保存选择的日期
  const selectedDate = ref(new Date())
  const date = new Date()
  // eslint-disable-next-line vue/no-setup-props-destructure
  const { initialUser } = defineProps(['initialUser'])
  const user = ref({ ...initialUser })
  const editing = ref(!!initialUser)
  console.log('editing2', editing.value)

  if (editing.value) {
    const date = new Date(user.value.createTime)
    user.value.createTime = date.toISOString().slice(0, 16)
  }

  // 计算属性，用于格式化日期时间
  const formattedCreateTime = toRef(user, 'createTime')
  watch(formattedCreateTime, (newVal, oldVal) => {
    // 处理用户输入的变化
    console.log('Updated createTime:', newVal)
  })

  // 处理输入框变化事件
  const updateCreateTime = (event) => {
    // 将用户输入的日期时间更新到数据属性中
    user.value.createTime = formatDateTime(event.target.value)
  }

  // 格式化日期时间的方法
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toISOString().slice(0, 16)
  }
</script>
