import { LitElement, html } from 'beaker://app-stdlib/vendor/lit-element/lit-element.js'
import { until } from 'beaker://app-stdlib/vendor/lit-element/lit-html/directives/until.js'
import { comments, annotations } from 'beaker://app-stdlib/js/uwg.js'
import css from '../../css/com/social-signals.css.js'
import 'beaker://app-stdlib/js/com/reactions/reactions.js'

class SocialSignals extends LitElement {
  static get properties () {
    return {
      userUrl: {type: String, attribute: 'user-url'},
      authors: {type: Array},
      topic: {type: String}
    }
  }

  static get styles () {
    return css
  }

  constructor () {
    super()
    this.userUrl = undefined
    this.authors = undefined
    this.topic = undefined
    this.numComments = undefined
    this.annotations = undefined
  }

  // rendering
  // =

  render () {
    if (!this.userUrl || !this.authors || !this.topic) return html``
    return html`
      <link rel="stylesheet" href="beaker://assets/font-awesome.css">
      <span class="comments">
        <span class="far fa-fw fa-comment"></span>
        ${until(this.renderNumComments(), '')}
      </span>
      ${until(this.renderAnnotations(), '')}
    `
  }

  async renderNumComments () {
    if (this.numComments === undefined) {
      this.numComments = (await comments.list({href: this.topic})).length
    }
    return this.numComments
  }

  async renderAnnotations () {
    if (this.annotations === undefined) {
      this.annotations = await annotations.tabulate(this.topic)
    }
    return '' // TODO
    // return html`
    //   <beaker-reactions
    //     user-url="${this.userUrl}"
    //     .reactions=${this.reactions}
    //     topic="${this.topic}"
    //   ></beaker-reactions>
    // `
  }
}
customElements.define('social-signals', SocialSignals)