export class Article extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.shadow = this.attachShadow({mode: 'open'})

		this.shadow.appendChild(this.styles())

		this.shadow.appendChild(this.createArticle())
	}

	createArticle() {

		const articleNode = document.createElement('div')
		articleNode.classList.add('div__article')

		articleNode.appendChild(
			this.addThumbnail()
		)

		articleNode.appendChild(
			this.addTitle()
		)

		articleNode.appendChild(
			this.addDescription()
		)

		return articleNode		
	}

	addThumbnail() {
		const thumbnailDivNode = document.createElement('div')
		thumbnailDivNode.classList.add('div__article__thumbnail')
		
		const thumbnailNode = document.createElement('img')
		thumbnailNode.classList.add('div__article__img__thumbnail')
		thumbnailNode.setAttribute('src', this.getAttribute('data-thumbnail'))

		thumbnailDivNode.appendChild(thumbnailNode)
		return thumbnailDivNode
	}

	addTitle() {
		const titleNode = document.createElement('div')
		titleNode.classList.add('div__article__title')
		titleNode.innerHTML = this.getAttribute('data-title')

		return titleNode
	}

	addDescription() {
		const descriptionNode = document.createElement('div')
		descriptionNode.classList.add('div__article__description')
		let descriptionText = this.getAttribute('data-description') != 'null'
			? this.getAttribute('data-description')
			: ''

		descriptionNode.innerHTML = descriptionText

		return descriptionNode
	}

	styles() {
		const style = document.createElement('style')
		style.textContent = `
			.div__article {
				border:1px solid #999;
				min-height: 80px;
				padding:5px;
				display:block;
				max-width: 588px;
			}

			.div__article__img__thumbnail {
				width: inherit;
				display:flex;
				width:80px;
			}

			.div__article__thumbnail {
				height:80px;
				float:left;
				display:flex;
			}

			.div__article__title {
				font-size: 1.5rem;
				color: black;
				padding:5px;
				display:flex;
			}

			.div__article__description {
				font-size: 1rem;
				color: gray;
				padding:5px;
				display:flex;
			}
		`

		return style
	}
}

customElements.define('article-item', Article)