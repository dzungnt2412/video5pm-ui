<template>
  <section class="card">
    <div class="card-block">
      <div class="card-title"><h4>Timeline</h4></div>
      <ul class="timeline">
        <li v-for="item in logs" :key="item.id">
          <h5 class="timeline-title">
            {{ title[item.action] }}
            <span class="float-right">{{ item.created_at | datetime }}</span>
          </h5>
          <p>{{ item.user.full_name || item.user.username }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      title: {
        update: 'Update order',
        create: 'Create order',
        tracking: 'Up tracking number order',
        'fulfill.create': 'Create a fulfill',
        'fulfill.cancel': 'Cancel a fulfill',
      },
    }
  },
  computed: {
    ...mapState('container', {
      logs: (state) => state.logs,
    }),
  },
}
</script>
