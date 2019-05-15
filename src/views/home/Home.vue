<template>
  <div class="wrapper">
    <Head></Head>
    <Sidebar></Sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Head from './Header.vue'
import Sidebar from './Sidebar.vue'
export default {
  components: {
    Head,
    Sidebar
  }
};
</script>
