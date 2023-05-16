<template>
    <div class="login-container">
        <a-form :model="userForm" name="normal_login" class="login-form" ref="userFormRef" :rules="rules">
            <h2 class="title">xiaohui系统登录</h2>
            <a-form-item name="userName">
                <a-input v-model:value="userForm.userName" allowClear size="large">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item name="password">
                <a-input v-model:value="userForm.password" type="password" allowClear size="large">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-button :disabled="disabled" type="primary" block size="large" @click="submit">
                Log in
            </a-button>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

interface LoginForm {
    userName: string,
    password: string
}

// router
const router = useRouter()

// refs
const userFormRef = ref<FormInstance>()

// 通过类型断言，明确 userForm 是 LoginForm 类型
const userForm = reactive({
    userName: 'xiaohui',
    password: '123456'
} as LoginForm)

// password 自定义校验规则
const validatePass = (_rule: any, value: string) => {
    let _value = value.trim()
    if (!_value) {
        return Promise.reject('Please input the password!')
    } else if (_value.length < 6) {
        return Promise.reject('Password length is at least 6!')
    }
    return Promise.resolve()
}

// rules
const rules: Record<string, Rule[]> = {
    userName: [
        {
            required: true,
            message: 'Please input user name',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            validator: validatePass,
            trigger: 'blur'
        }
    ]
}


// login handle
const submit = () => {
    userFormRef.value?.validate()
        .then(async () => {
            // const { data: res } = await login(userForm)
            console.log(userForm);

            // if (res.code !== 200) return message.error('Failed logged')
            message.success('Successfully')
            router.push('/home')
            sessionStorage.setItem('selectKeys', JSON.stringify(['/home']))
            sessionStorage.setItem('userinfo', JSON.stringify(userForm))
        })
        .catch(err => {
            message.error('Failed logged')
            return Promise.reject(err)
        })
}

const disabled = computed(() => {
    return !(userForm.userName && userForm.password)
})

</script>

<style lang="scss" scoped>
.login-container {
    position: relative;
    height: 100vh;
    background-color: #1E2E3D;

    .login-form {
        position: absolute;
        top: 40%;
        left: 50%;
        min-width: 460px;
        transform: translate(-50%, -50%);

        .title {
            color: #fff;
            letter-spacing: 1px;
            text-align: center;
            font-size: 26px;
        }
    }
}
</style>