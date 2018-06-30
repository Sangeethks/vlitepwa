<template>
  <div class="vlt-content container">
    <h2>Privacy Policy</h2>

    <p v-if="this.platform === 'MOOC'">Mobiotics built the vLite MOOC app as a Free app. This SERVICE is provided by mobiotics at no cost and is intended for use as is.
    </p>
    <p v-if="this.platform === 'LITE'">Mobiotics built the vLite app as a Free app. This SERVICE is provided by mobiotics at no cost and is intended for use as is.
    </p>
    <p>This page is used to inform website visitors regarding our policies with the collection, use, and
      disclosure of Personal Information if anyone decided to use our Service.
    </p>
    <p>If you choose to use our Service, then you agree to the collection and use of information in relation
      to this policy. The Personal Information that we collect is used for providing and improving the
      Service. We will not use or share your information with anyone except as described
      in this Privacy Policy.
    </p>
    <p v-if="this.platform === 'MOOC'">The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible
      at vLite MOOC unless otherwise defined in this Privacy Policy.
    </p>
    <p v-if="this.platform === 'LITE'">The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible
      at vLite unless otherwise defined in this Privacy Policy.
    </p>
    <h5>Information Collection and Use</h5>
    <p v-if="this.platform === 'MOOC'">For a better experience, while using our Service, we may require you to provide us with certain
      personally identifiable information, including but not limited to username, email, role ID, location, institute ID. The information that we request is will be retained by us and used as described in this privacy policy.
    </p>
    <p v-if="this.platform === 'LITE'">For a better experience, while using our Service, we may require you to provide us with certain
      personally identifiable information, including but not limited to username, email, location. The information that we request is will be retained by us and used as described in this privacy policy.
    </p>
    <p>The app does use third party services that may collect information used to identify you.</p>
    <div>
      <p>Link to privacy policy of third party service providers used by the app</p>
      <ul>
        <li><a href="https://www.google.com/policies/privacy/" target="_blank" class="vlt-link">Google Play Services</a></li>
        <li><a href="https://firebase.google.com/policies/analytics" target="_blank" class="vlt-link">Firebase Analytics</a></li>
        <li><a href="http://try.crashlytics.com/terms/privacy-policy.pdf" target="_blank" class="vlt-link">Crashlytics</a></li>
      </ul>
    </div>
    <h5>Log Data</h5>
    <p> We want to inform you that whenever you use our Service, in a case of an
      error in the app we collect data and information (through third party products) on your phone
      called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address,
      device name, operating system version, the configuration of the app when utilizing our Service,
      the time and date of your use of the Service, and other statistics.
    </p>
    <h5>Cookies</h5> <p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These
      are sent to your browser from the websites that you visit and are stored on your device's internal memory.
    </p>
    <p v-if="this.platform === 'MOOC'">This Service use “cookies” when user is logged in. The app may also use third party code and libraries
      that use “cookies” to collect information and improve their services. You have the option to either
      accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to
      refuse our cookies, you may not be able to login to the Service.
    </p>
    <p v-if="this.platform === 'LITE'">This Service shall use “cookies” for user session if you are logged in. The app may also use third party code and libraries
      that use “cookies” to collect information and improve their services. You have the option to either
      accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to
      refuse our cookies, you may not be able to use some portions of this Service.
    </p>
    <h5>Service Providers</h5>
    <p> We may employ third-party companies and individuals due to the following reasons:</p>
    <ul class="bulleted">
      <li>To facilitate our Service;</li>
      <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li>
      <li>To assist us in analyzing how our Service is used.</li>
    </ul>
    <br>
    <p> We want to inform users of this Service that these third parties have access to your
      Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they
      are obligated not to disclose or use the information for any other purpose.
    </p>
    <h5>Security</h5>
    <p> We value your trust in providing us your Personal Information, thus we are striving
      to use commercially acceptable means of protecting it. But remember that no method of transmission over
      the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee
      its absolute security.
    </p>
    <h5>Links to Other Sites</h5>
    <p>This Service may contain links to other sites. If you click on a third-party link, you will be directed
      to that site. Note that these external sites are not operated by us. Therefore, we strongly
      advise you to review the Privacy Policy of these websites. We have no control over
      and assume no responsibility for the content, privacy policies, or practices of any third-party sites
      or services.
    </p>
    <h5>Children’s Privacy</h5>
    <p>These Services do not address anyone under the age of 13. We do not knowingly collect
      personally identifiable information from children under 13. In the case we discover that a child
      under 13 has provided us with personal information, we immediately delete this from
      our servers. If you are a parent or guardian and you are aware that your child has provided us with personal
      information, please contact us so that we will be able to do necessary actions.
    </p>
    <h5>Changes to This Privacy Policy</h5>
    <p> We may update our Privacy Policy from time to time. Thus, you are advised to review
      this page periodically for any changes. We will notify you of any changes by posting
      the new Privacy Policy on this page. These changes are effective immediately after they are posted on
      this page.
    </p>
    <h5>Contact Us</h5>
    <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact
      us.
    </p>
    <p>This privacy policy page was created at <a href="https://privacypolicytemplate.net" target="_blank" class="vlt-link">privacypolicytemplate.net</a> and modified/generated by <a href="https://app-privacy-policy-generator.firebaseapp.com/" target="_blank" class="vlt-link">App Privacy Policy Generator</a>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'PrivacyPolicyContent',
  computed: {
    ...mapGetters([
      'platform'
    ])
  },
  created () {
    this.getTemplate();
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore'
    ]),
    getTemplate () {
      this.CommitConfigStore();
    }
  }
}
</script>

<style lang="scss" scoped>
.vlt-content {
  margin-bottom: 8em;
  h2 {
    margin-bottom: 20px;
  }
  h2, h5 {
    font-weight: 600;
  }
  h5, p {
    margin-bottom: 12px;
  }
  ul {
    margin-top: 12px;
    &.bulleted {
      margin-left: 20px;
      li {
        list-style: circle;
      }
    }
  }
}
</style>
