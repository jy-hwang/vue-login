<template>
  <div class="app">
    <div v-if="state.account.id">안녕하세요? {{ state.account.name }}님!</div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" name="" id="loginId" v-model="state.form.loginId" />
      </label>
      <label for="loginPw">
        <span>비밀번호</span>
        <input
          type="password"
          name=""
          id="loginPw"
          v-model="state.form.loginPw"
        />
      </label>
      <hr />
      <button @click="submit">로그인</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      account: {
        id: null,
        name: "",
      },
      form: {
        loginId: "",
        loginPw: "",
      },
    });

    const submit = () => {
      const args = {
        loginId: state.form.loginId,
        loginPw: state.form.loginPw,
      };
      axios
        .post("/api/account", args)
        .then((res) => {
          alert("로그인에 성공했습니다.");
          console.log(res);
          state.account = res.data;
          console.log(state.account);
        })
        .catch(() => {
          alert("로그인에 실패했습니다.\n계정정보를 확인해주세요.");
        });
    };

    axios.get("/api/account").then((res) => {
      state.account = res.data;
    });

    return { state, submit };
  },
};
</script>

<style></style>
