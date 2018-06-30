<template>
  <div class="vlt-content container">
    <h2>Terms &amp; Conditions</h2>

    <p>By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to mobiotics.</p>
    <p>Mobiotics is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</p>
    <p v-if="this.platform === 'MOOC'">The vLite MOOC app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the vLite MOOC app won’t work properly or at all. </p>
    <p v-if="this.platform === 'LITE'">The vLite app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the vLite app won’t work properly or at all. </p>
    <p>You should be aware that there are certain things that mobiotics will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but mobiotics cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.</p>
    <p>If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.</p>
    <p>Along the same lines, mobiotics cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, mobiotics cannot accept responsibility</p>
    <p>With respect to mobiotics’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. mobiotics accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.</p>
    <p>At some point, we may wish to update the app. The app is currently available on Android and iOS – the requirements for both systems (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. mobiotics does not promise that it will always update the app so that it is relevant to you and/or works with the iOS/Android version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.</p>
    <h5>Changes to This Terms and Conditions</h5>
    <p> We may update our Terms and Conditions from time to time. Thus, you are advised to review
      this page periodically for any changes. We will notify you of any changes by posting
      the new Terms and Conditions on this page. These changes are effective immediately after they are posted on
      this page.
    </p>
    <h5>Contact Us</h5>
    <p>If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact
      us.
    </p>
    <p>This Terms and Conditions page was generated by <a href="https://app-privacy-policy-generator.firebaseapp.com/" target="_blank" class="vlt-link">App Privacy Policy Generator</a></p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TermsOfUseContent',
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
