<template>
  <div>
    <div class="order-list-page page">
      <div class="page-header">
        <div class="page-header-group ml-0">
          <a href="#" class="btn btn-primary" @click="pushNoti">
            <p-icon name="upload"></p-icon>
            <span class="ml-5">Notification</span>
          </a>
        </div>
      </div>
      <div class="page-content container-fluid">
        <p-input
          placeholder="Enter email"
          prefixIcon="search"
          class="mb-2"
          type="email"
          validate="on"
          :value="filter.search"
          @keyup.enter="handleSearch"
        >
          <template slot="append">
            <p-button
              type="default"
              icon="close"
              v-if="filter.search"
              @click="clearSearch"
            ></p-button>
          </template>
        </p-input>

        <p-input
          placeholder="Enter password"
          class="mb-2"
          prefixIcon="search"
          type="password"
          :value="filter.search"
          @keyup.enter="handleSearch"
        >
          <template slot="append">
            <p-button
              type="default"
              icon="close"
              v-if="filter.search"
              @click="clearSearch"
            ></p-button>
          </template>
        </p-input>

        <p-input
          placeholder="Enter password"
          class="mb-2"
          prefixIcon="search"
          type="username"
          :value="filter.search"
          @keyup.enter="handleSearch"
        >
        </p-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { SHOW_NOTIFICATION_MESSAGE } from '@/packages/shared/store'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  mixins: [mixinRoute, mixinTable],
  created() {
    this.filter = this.getRouteQuery()
  },
  data() {
    return {
      isFetching: true,
      result: {},
      actions: {},
    }
  },

  methods: {
    ...mapActions('shared', [SHOW_NOTIFICATION_MESSAGE]),

    pushNoti() {
      this.showNotificationMessage({
        label: 'success',
        message: 'This is message success',
      })
    },

    async handleFetch() {
      this.handleUpdateRouteQuery()
    },
  },

  watch: {
    filter: {
      handler: function() {
        this.handleFetch()
      },
      deep: true,
    },
  },
}
</script>
