<template>
  <div class="vlt-garage">
    <div class="garage-space">
      <h2 class="text-center">GARAGE</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Element</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          <!-- Hamburger -->
          <tr>
            <td>Hamburger</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-hamb">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-hamb">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Input Textbox -->
          <tr>
            <td>Textbox</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <div class="vlt-input-group vlt-mtrl-group">
                  <input type="text" required>
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Textbox</label>
                </div>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <div class="vlt-input-group vlt-mtrl-group">
                    <input type="text" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Textbox</label>
                  </div>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Email input box -->
          <tr>
            <td>Email Input box</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <div class="vlt-input-group vlt-mtrl-group">
                  <input type="text" required>
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Email Address</label>
                </div>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <div class="vlt-input-group vlt-mtrl-group">
                    <input type="text" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Email Address</label>
                  </div>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Date Picker -->
          <tr>
            <td>Icon Input box</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <div class="vlt-input-group vlt-mtrl-group input-ico">
                  <input type="text" required>
                  <span class="ico-img">
                    <img src="@/assets/icons/calendar-dark.svg">
                  </span>
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Date Of Birth</label>
                </div>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <div class="vlt-input-group vlt-mtrl-group input-ico">
                    <input type="text" required>
                    <span class="ico-img">
                      <img src="@/assets/icons/calendar-dark.svg">
                    </span>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Date Of Birth</label>
                  </div>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Radio Button -->
          <tr>
            <td>Radio Button</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <div class="vlt-radio inline">
                  <input id="radio-1" name="radio_lite" type="radio" checked>
                  <label for="radio-1" class="radio-label">Male</label>
                </div>

                <div class="vlt-radio inline">
                  <input id="radio-2" name="radio_lite" type="radio">
                  <label for="radio-2" class="radio-label">Female</label>
                </div>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <div class="vlt-radio inline">
                    <input id="radio-1" name="radio" type="radio" checked>
                    <label for="radio-1" class="radio-label">Male</label>
                  </div>

                  <div class="vlt-radio inline">
                    <input id="radio-2" name="radio" type="radio">
                    <label for="radio-2" class="radio-label">Female</label>
                  </div>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Select -->
          <tr>
            <td>Select Input</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <div class="vlt-slct-grp">
                  <select class="vlt-slct-input">
                    <option value="0">Select Country</option>
                    <option value="1">USA</option>
                  </select>
                  <span class="ico-img">
                    <img src="@/assets/icons/caret-up-down.svg">
                  </span>
                </div>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <div class="vlt-slct-grp">
                    <select class="vlt-slct-input">
                      <option value="0">Select Country</option>
                      <option value="1">USA</option>
                    </select>
                    <span class="ico-img">
                      <img src="@/assets/icons/caret-up-down.svg">
                    </span>
                  </div>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button lg Primary -->
          <tr class="inverted">
            <td>Button lg Primary</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-lg-primary">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-lg-primary">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button lg Primary Inverted -->
          <tr>
            <td>Button lg Primary Inverted</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-lg-primary inverted">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-lg-primary inverted">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button lg hollow -->
          <tr class="inverted">
            <td>Button lg Hollow</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-lg-hollow">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-lg-hollow">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button lg hollow inverted -->
          <tr>
            <td>Button lg Hollow inverted</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-lg-hollow inverted">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-lg-hollow inverted">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button md Primary -->
          <tr class="inverted">
            <td>Button md Primary</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-md-primary">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-md-primary">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button md Primary Inverted -->
          <tr>
            <td>Button md Primary Inverted</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-md-primary inverted">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-md-primary inverted">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button md hollow -->
          <tr class="inverted">
            <td>Button md Hollow</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-md-hollow">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-md-hollow">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button md hollow inverted -->
          <tr>
            <td>Button md Hollow inverted</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-md-hollow inverted">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-md-hollow inverted">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button sm Primary -->
          <tr class="inverted">
            <td>Button sm Primary</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-sm-primary">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-sm-primary">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button sm Primary Inverted -->
          <tr>
            <td>Button sm Primary Inverted</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-sm-primary inverted">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-sm-primary inverted">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button sm hollow -->
          <tr class="inverted">
            <td>Button sm Hollow</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-sm-hollow">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-sm-hollow">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Button sm hollow inverted -->
          <tr>
            <td>Button sm Hollow inverted</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-sm-hollow inverted">Subscribe</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-sm-hollow inverted">Subscribe</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Facebook Button -->
          <tr>
            <td>Facebook Button</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-fb lg">Sign up with Facebook</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <div style="display: inline-block;">
                    <button type="button" class="btn-fb lg">Sign up with Facebook</button>
                  </div>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Google Button -->
          <tr>
            <td>Google Button</td>
            <td class="text-center">
              <div style="display: inline-block;">
                <button type="button" class="btn-gg lg">Sign up with Google</button>
              </div>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="btn-gg lg">Sign up with Google</button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Icon Button -->
          <tr class="inverted">
            <td>Icon Button</td>
            <td class="text-center">
              <button type="button" class="vlt-btn-ico">
                <img src="@/assets/icons/notification.svg">
              </button>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <button type="button" class="vlt-btn-ico">
                    <img src="@/assets/icons/notification.svg">
                  </button>
                </textarea>
              </pre>
            </td>
          </tr>

          <!-- Tag Links -->
          <tr>
            <td>Tag Links</td>
            <td class="text-center">
              <ul class="vlt-tags dark">
                <li>
                  <router-link to="/tag/category-name" class="tag-link">
                    Category
                  </router-link>
                </li>
                <li>
                  <router-link to="/tag/category-name" class="tag-link">
                    History
                  </router-link>
                </li>
                <li>
                  <router-link to="/tag/category-name" class="tag-link">
                    English
                  </router-link>
                </li>
                <li>
                  <router-link to="/tag/category-name" class="tag-link">
                    2013
                  </router-link>
                </li>
              </ul>
            </td>
            <td>
              <pre>
                <textarea name="name" rows="6" disabled>
                  <ul class="vlt-tags dark">
                    <li>
                      <router-link to="/tag/category-name" class="tag-link">
                        Category
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/tag/category-name" class="tag-link">
                        History
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/tag/category-name" class="tag-link">
                        English
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/tag/category-name" class="tag-link">
                        2013
                      </router-link>
                    </li>
                  </ul>
                </textarea>
              </pre>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import App from '@/mixins/App';

export default {
  name: 'Garage',
  mounted () {
    this.toggleLoader(false);
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.garage-space {
  padding: 20px;
}
table {
  width: 100%;
  tbody {
    text-align: center;
  }
  textarea {
    border: 0;
    width: 100%;
    resize: none;
  }
  tr {
    textarea {
      background-color: $clr-white-1;
      color: $clr-dark-grad-1;
    }
    &.inverted {
      background-color: $clr-dark-grad-1;
      color: $clr-white-1;
      textarea {
        background-color: $clr-dark-grad-1;
        color: $clr-white-1;
      }
    }
  }
}
.vlt-light {
  .garage-space, table {
    background-color: $clr-white-1;
    color: $clr-dark-grad-1;
  }
}
.vlt-dark {
  .garage-space, table, textarea {
    background-color: $clr-dark-grad-1;
    color: $clr-white-1;
  }
}
</style>
