<template>
  <section class="card">
    <div class="card-block">
      <div class="card-title"><h4>Timeline</h4></div>
      <ul class="timeline">
        <li v-for="item in items" :key="item.id">
          <h5 class="timeline-title">
            {{ title[item.type] }}
            <span class="float-right">{{ item.created_at | datetime }}</span>
          </h5>
          <p>{{ item.user.full_name || item.user.username }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: {
        'order.update': 'Update order',
        'order.create': 'Create order',
        'order.tracking': 'Up tracking number order',
      },
    }
  },
}
</script>
