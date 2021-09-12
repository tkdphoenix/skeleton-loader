import { LitElement, html, css, customElement, property, TemplateResult } from 'lit-element/lit-element'

@customElement('skeleton-loader')
export class SkeletonLoader extends LitElement {
  @property({ type: Boolean }) roundImg = false
  @property({ type: Number }) amountOfLines = 2

  _bodyTextTmpl () {
    let count: number = 0
    const arr: [TemplateResult] = [html``]
    for(count; count < this.amountOfLines; count += 1) {
      arr.push(html`<p class="row skeleton-loader"></p>`)
    }
    return html`
      ${arr.map(line => {
        return html`${line}`
      })}
    `
  }

	render() {
		return html`
			<div class="card">
        <div class="grid${this.roundImg ? ' withImg' : ' noImg'}">
          ${
            this.roundImg ? html `
              <div class="image skeleton-loader"></div>
            `
            : null
          }
          <div class="title skeleton-loader"></div>
        </div>
        ${this._bodyTextTmpl()}
      </div>
		`
	}

	static get styles() {
		return [
			css`
        :host {
          display: block;
        }
				.skeleton-loader {
					width: 100%;
					height: 15px;
					display: block;
					background: linear-gradient(
							to right,
							rgba(255, 255, 255, 0),
							rgba(255, 255, 255, 0.5) 50%,
							rgba(255, 255, 255, 0) 80%
						),
						lightgray;
					background-repeat: repeat-y;
					background-size: 50px 50px;
					background-position: 0 0;
					animation: shine 1.6s infinite;
				}
				@keyframes shine {
					to {
						background-position: 100% 0, 0 0; /* move highlight to right */
					}
				}
        .card {
          width: var(--skeleton-loader-card-width, 300px);
          height: var(--skeleton-loader-card-height, 150px);
          border: var(--skeleton-loader-card-border, 1px solid rgba(33, 33, 33, 0.15));
          box-shadow: var(--skeleton-loader-card-box-shadow, 0 4px 10px 0 rgba(33, 33, 33, 0.2));
          padding: var(--skeleton-loader-card-padding, 10px);
        }
        .grid {
          margin: 10px 0 30px 0;
        }
        .grid.withImg {
          display: grid;
          grid-template-columns: 60px 1fr;
        }
        .grid.noImg {
          display: block;
        }
        .image {
          height: var(--skeleton-loader-image-height, 40px);
          width: var(--skeleton-loader-image-width, 40px);
          border-radius: var(--skeleton-loader-image-border-radius, 50%);
          margin: 0 10px;
          transform: rotate(180deg); /* for some reason, this appears to animate right to left (backwards) */
        }
        .title {
          width: var(--skeleton-loader-title-width, 100%);
          height: var(--skeleton-loader-title-height, 40px);
          margin: var(--skeleton-loader-title-margin, 0 auto);
        }
        .row {
          width: var(--skeleton-loader-row-width, 95%);
          height: var(--skeleton-loader-row-height, 20px);
          position: relative;
          left: var(--skeleton-loader-row-left, 15px);
        }
			`,
		]
	}
}
