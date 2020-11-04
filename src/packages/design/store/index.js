import api from '../api'

export const FETCH_DESIGNS = 'fetchDesigns'
export const FETCH_DESIGN_COUNT = 'fetchDesignCount'
export const FETCH_DESIGN = 'fetchDesign'
export const CREATE_DESIGN = 'createDesign'
export const UPDATE_DESIGN = 'updateDesign'
export const UPDATE_DESIGN_SKU = 'updateDesignSku'
export const DELETE_DESIGN = 'deleteDesign'
export const FETCH_DESIGN_FILES = 'fetchDesignFiles'
export const DELETE_DESIGN_FILES = 'deleteDesignFile'
export const DOWNLOAD_DESIGN = 'downloadDesign'
export const PUSH_DESIGN_FILE = 'pushDesignFile'
export const REMOVE_DESIGN_FILE = 'removeDesignFile'

export const state = {
  designs: [],
  count: 0,
  design: {
    design_files: [],
  },
  designFiles: [],
  productTypes: [],
}

export const mutations = {
  [FETCH_DESIGNS](state, payload) {
    state.designs = payload
  },
  [FETCH_DESIGN](state, payload) {
    state.design = payload
  },
  [FETCH_DESIGN_COUNT](state, payload) {
    state.count = payload
  },
  [FETCH_DESIGN_FILES](state, payload) {
    state.designFiles = payload
  },
  [PUSH_DESIGN_FILE](state, payload) {
    state.design.design_files.push(payload)
  },
  [REMOVE_DESIGN_FILE](state, payload) {
    state.design.design_files = state.design.design_files.filter(
      (item) => item.id != payload.id
    )
  },
}

export const actions = {
  /**
   * Fetch design list
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean, message: string, items: (Array)}>}
   */
  async fetchDesigns({ commit }, payload) {
    let success = true
    let message = ''
    let [list, count] = await Promise.all([
      api.fetchDesigns(payload),
      api.fetchDesignCount(payload),
    ])

    if (!list || list.error || !count) {
      list = {
        designs: [],
      }
      count = { count: 0 }
      success = false
      message = list.errorMessage || ''
    }

    commit(FETCH_DESIGNS, list.designs)
    commit(FETCH_DESIGN_COUNT, count.count)

    return { success, message, items: list.designs }
  },

  /**
   * Fetch design item
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchDesign({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchDesign(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }

      response = {
        design: {},
      }
    }

    if (!response.design.design_files) {
      response.design.design_files = []
    }

    commit(FETCH_DESIGN, response.design)
    return result
  },

  /**
   * Create design
   * @param commit
   * @param payload
   * @return {Promise<boolean|*>}
   */
  // eslint-disable-next-line
  async createDesign({ commit }, payload) {
    const response = await api.create(payload)
    if (response && response.design && response.design.id) {
      return { success: true, id: response.design.id }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Update design
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  // eslint-disable-next-line no-unused-vars
  async updateDesign({ commit }, payload) {
    const response = await api.update(payload)

    if (response && response.success) {
      return {
        success: true,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  async updateDesignSku({ commit }, payload) {
    const response = await api.updateSku(payload)
    if (response && response.design && response.design.id) {
      commit(FETCH_DESIGN, response.design)
      return {
        success: true,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  async deleteDesign({ commit }, payload) {
    const response = await api.delete(payload)
    if (response && response.success) {
      commit(FETCH_DESIGN, response.design)
      return {
        success: true,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },
  /**
   * Fetch design files
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchDesignFiles({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchDesignFiles(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }

      response = {
        design_files: {},
      }
    }

    commit(FETCH_DESIGN_FILES, response.design_files)
    return result
  },
  // eslint-disable-next-line no-unused-vars
  async downloadDesign({ commit }, payload) {
    let result = { success: true }
    let response = await api.downloadFile(payload)

    if (!response || response.error) {
      return (result = {
        success: false,
        message: response.errorMessage || '',
      })
    }

    result.blob = response

    return result
  },
  async deleteDesignFile({ commit }, payload) {
    const response = await api.deleteDesignFile(payload)

    if (response && response.success) {
      commit(REMOVE_DESIGN_FILE, payload)
      return {
        success: true,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },
}
