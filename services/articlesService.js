export class ArticlesService {
	async getArticles(text) {

		const articlesUrl = 'https://en.wikipedia.org/w/rest.php/v1/search/title'
		const res = await fetch(
			`${articlesUrl}?q='+${text}+'&limit=10`
		)

		return await res.json()
	}
}