<template>
  <div class="page">
    <div class="row mt-20 pl-50">
      <div class="col-xl-5 col-md-12 info-panel">
        <router-link :to="{ name: 'general' }" slot="icon">
          <statistic-card>
            <router-link :to="{ name: 'general' }" slot="icon">
              <p-button
                :icon="'settings'"
                icon-pack="md"
                :type="'primary'"
                round
                raised
              ></p-button>
            </router-link>
            <template slot="heading">
              <b>General</b>
              <br />
              <p class="content-text ml-50">View and update your shop</p>
            </template>
          </statistic-card>
        </router-link>
      </div>
      <div class="col-xl-5 col-md-6 info-panel" v-show="false">
        <router-link :to="{ name: 'general' }" slot="icon">
          <statistic-card>
            <router-link :to="{ name: 'general' }" slot="icon">
              <p-button
                :icon="'account'"
                icon-pack="md"
                :type="'primary'"
                round
                raised
              ></p-button>
            </router-link>
            <template slot="heading">
              <b>Account</b>
              <br />
              <p class="content-text ml-50">Manage account and permissions</p>
            </template>
          </statistic-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticCard from '@components/shared/card/StatisticCard'

export default {
  components: {
    StatisticCard,
  },
}
</script>
