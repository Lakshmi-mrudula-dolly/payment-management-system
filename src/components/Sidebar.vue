<template>
  <div>
    <!-- Mobile Top Bar -->
    <div class="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
      <span class="font-bold text-lg">💳 Fintech</span>
      <button @click="isOpen = !isOpen">
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <div
      :class="[
        'bg-gray-800 text-white flex flex-col h-screen md:h-auto md:w-64 fixed md:relative transition-transform duration-300 z-50',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="p-4 text-2xl font-bold border-b border-gray-700 md:hidden">
        💳 Fintech Admin
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <RouterLink
          to="/dashboard"
          class="block py-2 px-3 rounded hover:bg-gray-700"
          active-class="bg-gray-700"
          @click="isOpen = false"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/users"
          class="block py-2 px-3 rounded hover:bg-gray-700"
          active-class="bg-gray-700"
          @click="isOpen = false"
        >
          Users
        </RouterLink>
        <RouterLink
          to="/payments"
          class="block py-2 px-3 rounded hover:bg-gray-700"
          active-class="bg-gray-700"
          @click="isOpen = false"
        >
          Payments
        </RouterLink>
      </nav>
      <div class="p-4 border-t border-gray-700 text-sm text-gray-400">
        © 2025 Fintech
      </div>
    </div>

    <!-- Overlay when sidebar is open on mobile -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false);
</script>
