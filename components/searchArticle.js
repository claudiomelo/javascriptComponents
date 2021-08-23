import { ArticlesService } from '../services/articlesService.js'

export class SearchArticle extends HTMLElement {
	constructor() {
		super()

		this.articlesService = new ArticlesService()
	}

	connectedCallback() {
		this.shadow = this.attachShadow({mode: 'open'})

		this.shadow.appendChild(this.styles())

		this.createSearch()

	}

	createSearch() {
		this.createSearchDiv()
		this.createSearchInput()
		this.createSearchButton()
	}

	createSearchDiv() {
		const search = document.createElement('div')
		search.classList.add('div__search__bar')

		this.shadow.appendChild(search)
	}

	createSearchInput() {
		this.searchInput = document.createElement('input')
		this.searchInput.type = 'text'
		this.searchInput.id = 'input-search-articles'
		this.searchInput.setAttribute('placeholder', 'Search for pages containing [x]…')
		this.searchInput.setAttribute('title', 'Search for pages containing [x]…')
		this.searchInput.classList.add('div__input__search')
		this.shadow.appendChild(this.searchInput)

		const thisClass = this
		this.searchInput.addEventListener('keypress', function (e) {
		    if (e.key === 'Enter') {
		    	thisClass.searchArticles()
		    }
		})
	}

	createSearchButton() {
		const searchButton = document.createElement('button')
		searchButton.classList.add('div__button__search')
		searchButton.innerText = 'Search'
		this.shadow.appendChild(searchButton)

		searchButton.addEventListener('click', this.searchArticles.bind(this))

		const thisClass = this
		searchButton.addEventListener('keypress', function (e) {
		    if (e.key === 'Enter') {
		    	thisClass.searchArticles()
		    }
		})
	}

	async searchArticles() {

		if (!this.searchInput.value) {
			alert('Please inform the search.')
			return
		}
		const articles = await this.articlesService.getArticles(this.searchInput.value)

		document.getElementById('div-list-articles').innerHTML = ''
		articles.pages.forEach(article => {
			let thumbnail = article.thumbnail 
				? article.thumbnail.url 
				: './imgs/no-image-availiable.jpg'

			const articleItem = document.createElement('article-item')
			articleItem.setAttribute('data-thumbnail', thumbnail)
			articleItem.setAttribute('data-title', article.title)
			articleItem.setAttribute('data-description', article.description)

			document.getElementById('div-list-articles').appendChild(
				articleItem
			)
		})
	}

	styles() {
		const style = document.createElement('style')
		style.textContent = `
			.div__search__bar {
				width:100%;
			}

			.div__input__search {
				font-size: 2rem;
				width: 475px;
			}

			.div__button__search {
				font-size: 2rem;
				color: black;
				background: white;
			}
		`

		return style
	}
}

customElements.define('search-articles', SearchArticle)