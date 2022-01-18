<template>
  <ul class="nav nav-tabs justify-content-center mb-3">
    <li class="nav-item">
      <router-link to="/statistics/main" class="nav-link">
        Main
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/statistics/devices" class="nav-link">
        Devices
      </router-link>
    </li>
  </ul>

  <router-view />
</template>

<script>
</script>
