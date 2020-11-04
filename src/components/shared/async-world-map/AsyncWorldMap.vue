<template>
  <world-map :data="data"></world-map>
</template>
<script>
const WorldMap = () => ({
  component: import('./WorldMap.vue'),
  delay: 200,
})

export default {
  components: {
    WorldMap,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>
