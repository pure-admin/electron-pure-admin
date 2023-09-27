<script setup lang="ts">
import Motion from "./utils/motion";
import { loginRules } from "./utils/rule";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { addPathMatch } from "@/router/utils";
import { ship } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { setToken } from "@/utils/auth";
import { useRouter } from "vue-router";

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const title = ref("智能数据评估系统");

const ruleForm = reactive({
  username: "admin",
  password: "admin123"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 全部采取静态路由模式
      usePermissionStoreHook().handleWholeMenus([]);
      addPathMatch();
      http.post("auth/login", { data: ruleForm }).then(res => {
        if (res.success) {
          loading.value = false;
          setToken({
            username: ruleForm.username,
            roles: ["admin"],
            accessToken: ""
          } as any);
          router.push("/");
          message("登录成功", { type: "success" });
        } else {
          loading.value = false;
          message("登录失败", { type: "error" });
        }
      });
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="ship" class="wave" />
    <div class="flex-c absolute">
      <div class="login-container">
        <div class="login-box">
          <div class="login-form">
            <Motion>
              <h2 class="outline-none">{{ title }}</h2>
            </Motion>

            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="loginRules"
              size="large"
            >
              <Motion :delay="100">
                <el-form-item
                  :rules="[
                    {
                      required: true,
                      message: '请输入账号',
                      trigger: 'blur'
                    }
                  ]"
                  prop="username"
                >
                  <el-input
                    clearable
                    v-model="ruleForm.username"
                    placeholder="账号"
                    :prefix-icon="useRenderIcon(User)"
                  />
                </el-form-item>
              </Motion>

              <Motion :delay="150">
                <el-form-item prop="password">
                  <el-input
                    clearable
                    show-password
                    v-model="ruleForm.password"
                    placeholder="密码"
                    :prefix-icon="useRenderIcon(Lock)"
                  />
                </el-form-item>
              </Motion>

              <Motion :delay="250">
                <el-button
                  class="w-full mt-4"
                  size="default"
                  type="primary"
                  :loading="loading"
                  @click="onLogin(ruleFormRef)"
                >
                  登录
                </el-button>
              </Motion>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
