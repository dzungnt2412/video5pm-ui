/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'
import '../uikit/styles/pkit.scss'
import '@assets/scss/bootstrap.scss'
import '@assets/scss/bootstrap-extend.scss'
import '@assets/scss/site.scss'
import '@assets/scss/web-icons/web-icons.scss'
import '@assets/fonts/material-design/material-design.min.css'
const req = require.context('../uikit', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
