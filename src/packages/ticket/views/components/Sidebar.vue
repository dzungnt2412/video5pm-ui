<template>
  <div class="treeview">
    <ul class="list-group">
      <li class="pt-25 list-group-item" :class="{ current: status == 'open' }">
        <span class="icon node-icon wb-inbox"></span>
        <a href="#" @click="onChangeStatus('open')">
          <strong>Mới</strong>
        </a>
        <span class="node-count">{{
          statisticTickets.open ? statisticTickets.open.total : 0
        }}</span>
      </li>
      <li class="list-group-item" :class="{ current: status == 'process' }">
        <span class="icon node-icon wb-chat-working"></span>
        <a href="#" @click="onChangeStatus('process')">
          <strong>Đang xử lý</strong>
        </a>
        <span class="node-count">{{
          statisticTickets.process ? statisticTickets.process.total : 0
        }}</span>
      </li>
      <li
        class="pb-25 list-group-item"
        :class="{ current: status == 'closed' }"
      >
        <span class="icon node-icon wb-check-circle"></span>
        <a href="#" @click="onChangeStatus('closed')">
          <strong>Đã hoàn thành</strong>
        </a>
        <span class="node-count">{{
          statisticTickets.closed ? statisticTickets.closed.total : 0
        }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import mixinRoute from '@core/mixins/route'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TicketSidebar',
  mixins: [mixinRoute],
  data() {
    return {
      status: '',
      highlight: '',
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapState('ticket', {
      statisticTickets: (state) => state.statisticTickets,
    }),
  },
  methods: {
    ...mapActions('ticket', ['fetchTicketStatictis']),

    async init() {
      let q = this.$route.query
      if (typeof q.status !== 'undefined') {
        this.status = q.status
      }

      await this.fetchTicketStatictis()
    },

    onChangeStatus(status = '') {
      this.status = status
      this.highlight = ''
      this.$router.push({
        name: 'ticket-list',
        query: {
          status: this.status,
          highlight: this.highlight,
        },
      })
    },
    onChangeHighlight(value = '') {
      this.highlight = value
      this.status = 'process'
      this.$router.push({
        name: 'ticket-list',
        query: {
          status: this.status,
          highlight: this.highlight,
        },
      })
    },
  },
}
</script>
