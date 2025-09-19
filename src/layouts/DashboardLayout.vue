<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col md:ml-64">
      <NavigationBar />
      <main class="flex-1 p-6 bg-gray-100">
        <router-view />
      </main>
    </div>
  </div>
</template>


<script setup>
import Sidebar from ".././components/Sidebar.vue";
import NavigationBar from ".././components/NavigationBar.vue";
</script>
