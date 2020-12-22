<template>
  <div class="home">
    <Example message="Hello from home" />
  </div>
</template>

<script>
// @ is an alias to /src
import Example from '@/assets/Example.vue'

export default {
  name: "Home",
  components: {
    Example
  }
};
</script>
