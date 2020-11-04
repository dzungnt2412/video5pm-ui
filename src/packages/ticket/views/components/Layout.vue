<template>
  <div class="ticket-page page">
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-3">
          <div class="d-flex mb-2 justify-content-between tal">
            <router-link
              :to="{ name: 'ticket-form' }"
              class="col-6 btn btn-primary"
            >
              <p-icon name="envelope"></p-icon>
              <span class="ml-5">Mở ticket</span>
            </router-link>
            <a
              class="col-5 btn btn-default bg-white btn-outline"
              @click="refresh"
            >
              <p-icon
                :class="{ 'animation-rotate': isLoading }"
                icon-pack="md"
                name="refresh"
              ></p-icon>
              <span class="ml-5">Refresh</span>
            </a>
          </div>
          <Sidebar />
        </div>
        <div class="col-xl-9">
          <router-view :key="$route.name"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from './Sidebar'
import mixinRoute from '@core/mixins/route'
import { mapActions } from 'vuex'

export default {
  name: 'TicketLayout',
  mixins: [mixinRoute],
  components: { Sidebar },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ticketID() {
      return parseInt(this.$route.params.id, 10)
    },
  },
  methods: {
    ...mapActions('ticket', [
      'fetchTicketStatictis',
      'fetchTickets',
      'fetchTicket',
    ]),

    async refresh() {
      this.isLoading = true
      await this.fetchTicketStatictis()
      if (this.ticketID) {
        await this.fetchTicket(this.ticketID)
      } else {
        let filter = this.getRouteQuery()
        await this.fetchTickets(filter)
      }
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },

    handlerCreateTicket() {
      this.$router.push({ name: 'ticket-form' })
    },
  },
}
</script>
