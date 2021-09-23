<template>
  <div class="login pt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4">
          <form>
            <div class="mb-3">
              <label for="account" class="form-label">帳號</label>
              <input class="form-control" id="account" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密碼</label>
              <input type="password" class="form-control" id="password" />
            </div>
            <button type="button" class="btn btn-primary">登入</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data: () => {
    return {
      LoginDto: {
        account: "",
        password: "",
      },
    };
  },
});
</script>


<style lang="sass">
</style>