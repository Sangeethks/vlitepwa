import Vue from 'vue'

const state = {
  LITECategories: [
    { category: 'TVSHOW' },
    { category: 'MOVIE' },
    { category: 'MUSIC' },
    { category: 'SERIES' },
    { category: 'LIVE' }
  ]
}

const getters = {
  LITECategories: (state) =>  state.LITECategories,
}

const mutations = {
}

const actions = {
  /**
   * List Categories
   */
  actListCategories: (context, data = null) => {
    // Set data from local storage to the store
    context.dispatch('CommitLocalStore');
    // Get AppConfig Getter
    let AppConfig = context.getters.AppConfig;
    // Get vendorid
    let vendorid = AppConfig.vendorid;
    // Get vendorkey
    let vendorkey = AppConfig.vendorkey;
    // If vendorid and vendorkey is not available, don't continue
    if (!(vendorid && vendorkey)) return;
    // Get the base URL
    let baseUrl = context.getters.baseUrl;

    return new Promise((resolve, reject) => {
      Vue.http.get(baseUrl + '/subscriber/v1/content/category', {
        params: {
          vendorid,
          vendorkey,
          ...data
        }
      }).then(response => {
        // console.log('[Store Content] actGetRecentWatched response', response);

        resolve(response.body);
      }).catch(error => {
        // console.log('[Store Content] actGetRecentWatched error', error);

        reject(error.bodyText);
      })
    });
  },
  /**
   * List Content
   */
  actListContents: (context, data) => {
    let baseUrl = context.getters.baseUrl;

    return new Promise((resolve, reject) => {
      let AppConfig = JSON.parse(localStorage.getItem('AppConfig'))
      if (!AppConfig) {
        reject('Missing App Config Data')
      }

      // DEBUG:
      // console.log('[Store Content -> actListContents -> data]', data);

      Vue.http.get(baseUrl + '/subscriber/v1/content', {
        params: {
          vendorid: AppConfig.vendorid,
          vendorkey: AppConfig.vendorkey,
          ...data
        }
      }).then(response => {
        // console.log('[Store Content] actGetRecentWatched response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.status, statusText: response.statusText });
        }
      }).catch(error => {
        // console.log('[Store Content] actGetRecentWatched error', error);

        reject({ error: true, statusText: error.bodyText });
      })
    });
  },
  /**
   * Gets specific content information based on contentid
   */
  actGetContent: (context, contentId) => {
    let baseUrl = context.getters.baseUrl;

    return new Promise((resolve, reject) => {
      let AppConfig = JSON.parse(localStorage.getItem('AppConfig'))
      if (!AppConfig) {
        reject('Missing App Config Data');
      }

      Vue.http.get(baseUrl + '/subscriber/v1/content/' + contentId, {
        params: {
          vendorid: AppConfig.vendorid,
          vendorkey: AppConfig.vendorkey
        }
      }).then(response => {
        // console.log('[Store Content] actGetRecentWatched response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.status, statusText: response.statusText });
        }
      }).catch(error => {
        // console.log('[Store Content] actGetRecentWatched error', error);

        reject(error);
      })
    });
  },
  /**
   * List Tags
   */
  actListTags: (context, data) => {
    let baseUrl = context.getters.baseUrl;

    return new Promise((resolve, reject) => {
      let AppConfig = JSON.parse(localStorage.getItem('AppConfig'))
      if (!AppConfig) {
        reject('Missing App Config Data');
      }

      Vue.http.get(baseUrl + '/subscriber/v1/content/tags', {
        params: {
          vendorid: AppConfig.vendorid,
          vendorkey: AppConfig.vendorkey,
          ...data
        }
      }).then(response => {
        // console.log('[Store Content] actGetRecentWatched response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.status, statusText: response.statusText });
        }
      }).catch(error => {
        // console.log('[Store Content] actGetRecentWatched error', error);

        reject({ error: true, statusText: error.bodyText });
      })
    });
  },
  /**
   * List Levels
   */
  actListLevels: (context, data = null) => {
    // Commit local storage data to store
    context.dispatch('CommitLocalStore');
    // Get base url
    let baseUrl = context.getters.baseUrl;
    // Get AppConfig
    let AppConfig = context.getters.AppConfig;
    // If no AppConfig data, return.
    if (!AppConfig) return;

    return new Promise((resolve, reject) => {
      Vue.http.get(baseUrl + '/subscriber/v1/content/levels', {
        params: {
          // Mandatory
          // 1. vendorid
          // 2. vendorkey
          // Optional
          // 1. category

          vendorid: AppConfig.vendorid,
          vendorkey: AppConfig.vendorkey,
          ...data
        }
      }).then(response => {
        // console.log('[Store Content] actGetRecentWatched response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.status, statusText: response.statusText });
        }
      }).catch(error => {
        // console.log('[Store Content] actGetRecentWatched error', error);

        reject({ error: true, statusText: error.bodyText });
      })
    });
  },
  /**
   * Get Content Summary
   */
  actGetContentSummary: (context, data) => {
    let baseUrl = context.getters.baseUrl;

    return new Promise((resolve, reject) => {
      let AppConfig = JSON.parse(localStorage.getItem('AppConfig'))
      if (!AppConfig) {
        reject('Missing App Config Data');
      }

      Vue.http.get(baseUrl + '/subscriber/v1/content/summary', {
        // Mandatory
        // 1. vendorid 2. vendorkey
        // Optional
        // 3. level
        // 4. seriesid//For SERIES

        params: {
          vendorid: AppConfig.vendorid,
          vendorkey: AppConfig.vendorkey,
          ...data
        }
      }).then(response => {
        // console.log('[Store Content] actGetRecentWatched response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.status, statusText: response.statusText });
        }
      }).catch(error => {
        // console.log('[Store Content] actGetRecentWatched error', error);

        reject({ error: true, statusText: error.bodyText });
      })
    });
  },
  /**
   * Get Content Count
   */
  actGetContentCount: (context, data) => {
    let baseUrl = context.getters.baseUrl;

    return new Promise((resolve, reject) => {
      let AppConfig = JSON.parse(localStorage.getItem('AppConfig'))
      if (!AppConfig) {
        reject('Missing App Config Data');
      }

      Vue.http.get(baseUrl + '/subscriber/v1/content/count', {
        // Mandatory
        // 1. vendorid 2. vendorkey
        // Optional
        // 1. category
        // 2. tag
        // 3. contenttype
        // 4. showtype
        // 5. castncrewid
        // 6. level
        // 7. language
        // 8. year

        params: {
          vendorid: AppConfig.vendorid,
          vendorkey: AppConfig.vendorkey,
          ...data
        }
      }).then(response => {
        // console.log('[Store Content] actGetRecentWatched response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.status, statusText: response.statusText });
        }
      }).catch(error => {
        // console.log('[Store Content] actGetRecentWatched error', error);

        reject({ error: true, statusText: error.bodyText });
      })
    });
  }
}

export const Content = { state, getters, mutations, actions }
