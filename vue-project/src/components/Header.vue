<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-dark px-3">
        <div class="container-fluid">
            <a class="navbar-brand d-flex" href="#">
                <img class="logo" src="@/assets/logo.png" alt="">
                Vue
            </a>
            <ul class="navbar-nav flex-row justify-content-around w-50">
                <li class="nav-item">
                    <router-link class="nav-link active" to="/product">商品資訊</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="#">個人資訊</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="#">測試資料</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="#">測試資料</router-link>
                </li>
            </ul>
            <button class="btn btn-outline-light" type="button">登入</button>
        </div>
    </nav>     
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss">
nav{
    &{
        background-color: #000093;
    }

   .logo{
        width: 30px;
        height: 30px;
        margin-right: 5px;
    }	
}

</style>