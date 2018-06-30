import Vue from 'vue';

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  /**
   * Get Vendor Information
   */
  actGetVendorInfo: (context) => {
    // console.log('[Store Vendor.js -> actGetVendorInfo]');

    // Commit Mutation local storage
    context.dispatch('CommitLocalStore');
    // Get vendorid
    let vendorid = context.getters.vendorid;
    // Get vendorkey
    let vendorkey = context.getters.vendorkey;
    // If vendorid and vendorkey is not available, don't continue
    if (!(vendorid && vendorkey)) return;
    // Get the base URL
    let baseUrl = context.getters.baseUrl;

    return new Promise((resolve, reject) => {
      Vue.http.get(baseUrl + '/subscriber/v1/vendor', {
        params: {
          vendorid,
          vendorkey
        }
      }).then(response => {
        // console.log('[Store Vendor.js -> actGetVendorInfo -> response]', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.status });
        }
      }).catch(error => {
        // console.log('[Store Vendor] actGetVendorInfo error', error);

        reject(error.bodyText);
      })
    });
  },
  getFaqJSON(context) {
    context.commit('CommitConfigStore');
    // Get platform
    let platform = context.getters.platform;
    if (!platform) return;
    // Get Faq URL based on platform
    let faqURL;
    if (platform === 'MOOC') {
      faqURL = context.getters.FAQ_MOOC_URL;
    } else if (platform === 'LITE') {
      faqURL = context.getters.FAQ_LITE_URL;
    }

    return new Promise(function(resolve, reject) {
      Vue.http.get(faqURL).then(response => {
        // console.log('[Store -> Vendor.js -> getFaqJSON -> response]', response);

        resolve(response);
      }).catch(error => {
        // console.log('[Store -> Vendor.js -> getFaqJSON -> error]', error);

        reject(response);
      });
    });;
  }
}

export const Vendor = { state, getters, mutations, actions }
