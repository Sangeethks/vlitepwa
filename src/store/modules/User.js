import Vue from 'vue';
import jQuery from 'jquery';

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  /**
   * Login API
   */
  actLogin: (context, data) => {
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
    // Get base URL
    let baseUrl = context.getters.baseUrl;
    // // Create Login API url
    // let url = baseUrl + '/subscriber/v1/login';

    // The login parameters
    // Mandatory
    // 1. vendorid
    // 2. vendorkey
    // 3. email
    // 4. password
    let params = { vendorid, vendorkey, ...data };

    let url = `${baseUrl}/subscriber/v1/login`;

    // NOTE: VUE-RESOUCE API CALL
    return new Promise(function(resolve, reject) {
      Vue.http.get(url, { params }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  },
  /**
   * Logout API
   */
  actLogout: (context) => {
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
    // Get base URL
    let baseUrl = context.getters.baseUrl;

    // Create Login API url
    let url = `${baseUrl}/subscriber/v1/logout`;

    return new Promise(function(resolve, reject) {
      Vue.http.get(url).then(response => {
        // console.log('[Store actLogout] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actLogout] error', error);

        reject(error);
      });
    });
  },
  /**
  * Subscribe (Mailer and Subscription)
  */
  actSubscribe: (context, data) => {
    // console.log('[User -> actGetSubscribe data]', data);

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
    // Get base URL
    let baseUrl = context.getters.baseUrl;

    // Mandatory
    // 1. vendorid
    // 2. vendorkey
    // 3. email
    // 4. subscribername
    // 5. country
    // Mandatory only for subscription
    // 1. password
    // Optional for MOOC Subscription
    // 1. level
    // 2. instituteid
    // 3. roleid
    // Optional
    // 1. dob
    // 2. gender
    // 3. contactno
    // 4. picture <filename>

    let params = { vendorid, vendorkey, ...data };
    // Define the URL
    let URL = `${baseUrl}/subscriber/v1/subscriber/subscribe`;

    // console.log('[User -> actGetSubscribe params]', params);

    return new Promise(function(resolve, reject) {
      Vue.http.post(URL, params, {
        emulateJSON: true
      }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  },
  /**
  * Unsubscribe
  */
  actUnsubscribe: (context, data) => {
    // console.log('[Store -> actGetSubscribe]');

    let baseUrl = context.getters.baseUrl;

    return new Promise(function(resolve, reject) {
      let AppConfig = JSON.parse(localStorage.getItem('AppConfig'))
      if (!AppConfig) {
        reject('Missing App Config Data')
      }

      // The login parameters
      let body = {
        // Mandatory
        // 1. vendorid
        // 2. vendorkey
        // 3. email

        vendorid: AppConfig.vendorid,
        vendorkey: AppConfig.vendorkey,
        ...data
      }

      let url = baseUrl + '/subscriber/v1/subscriber/unsubscribe'

      Vue.http.delete(url, { body }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  },
  /**
  * Update Subscriber
  */
  actUpdateSubscriber: (context, data) => {
    context.commit('CommitConfigStore');
    let vendorid = context.getters.vendorid;
    let vendorkey = context.getters.vendorkey;

    context.commit('CommitUserStore');
    let subscriberid = context.getters.subscriberid;

    let baseUrl = context.getters.baseUrl;

    let params = {
      // Mandatory
      // 1. vendorid 2. vendorkey
      // Optional
      // 1. subscribername 2. password
      // 3. level
      // 4. dob
      // 5. gender
      // 6. contactno
      // 7. picture<filename>

      vendorid,
      vendorkey,
      ...data
    }

    // console.log('[Store User.js -> actUpdateSubscriber -> params]', params);

    let URL = `${baseUrl}/subscriber/v1/subscriber/${subscriberid}`;

    return new Promise(function(resolve, reject) {
      Vue.http.put(URL, params).then(response => {
        // console.log('[Store User actUpdateSubscriber response]', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true, status: response.error, statusText: response.reason });
        }
      }).catch(error => {
        // console.log('[Store User actUpdateSubscriber error]', error);

        reject({ error: true, status: error.status, statusText: error.statusText });
      });
    });
  },
  /**
  * Update Subscriber
  */
  actGetSubscriber: (context, data) => {
    // console.log('[Store actGetSubscribe]');
    // console.log('[Store actGetSubscribe data]', data);

    // Set data from local storage to the store
    context.dispatch('CommitLocalStore');
    // Get AppConfig Getter
    let AppConfig = context.getters.AppConfig;
    // Get vendorid
    let vendorid = AppConfig.vendorid;
    // Get vendorkey
    let vendorkey = AppConfig.vendorkey;
    // Get email
    let email = data.email;
    // If vendorid and vendorkey is not available, don't continue
    if (!(vendorid && vendorkey)) return;
    // Get base URL
    let baseUrl = context.getters.baseUrl;

    // Create Login API url
    let url = `${baseUrl}/subscriber/v1/subscriber`;

    // NOTE: VUE-RESOUCE API CALL
    return new Promise(function(resolve, reject) {
      // The login parameters
      let params = {
        // Mandatory
        // 1. vendorid
        // 2. vendorkey
        // 3. email

        vendorid,
        vendorkey,
        ...data
      }

      Vue.http.get(url, { params }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  },
  /**
  * Reset Password
  */
  actResetPassword: (context, data) => {
    let baseUrl = context.getters.baseUrl;

    context.commit('CommitConfigStore');
    let vendorid = context.getters.vendorid;
    let vendorkey = context.getters.vendorkey;

    return new Promise(function(resolve, reject) {
      // The login parameters
      let params = {
        // Mandatory
        // 1. vendorid
        // 2. vendorkey
        // 3. email

        vendorid,
        vendorkey,
        ...data
      }
      // Define the API URL
      let URL = `${baseUrl}/subscriber/v1/passwordreset`;

      // console.log('[Store actGetSubscribe] params', params);

      Vue.http.get(URL, { params }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  },
  /**
  * File Upload
  */
  actFileUpload: (context, data) => {
    let baseUrl = context.getters.baseUrl;

    return new Promise(function(resolve, reject) {
      let AppConfig = JSON.parse(localStorage.getItem('AppConfig'))
      if (!AppConfig) {
        reject('Missing App Config Data')
      }

      // The login parameters
      let params = {
        // Image (xxx urlencoded form with objectname=filename – square JPG or PNG image less than 100KB and width 256x256 px or more)

        vendorid: AppConfig.vendorid,
        vendorkey: AppConfig.vendorkey,
        ...data
      }

      // console.log('[Store actGetSubscribe] params', params);

      Vue.http.post(baseUrl + '/subscriber/v1/fileupload', params, {
        emulateJSON: true
      }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  }
}

export const User = { state, getters, mutations, actions }
