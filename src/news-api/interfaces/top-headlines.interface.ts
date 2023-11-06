export interface ITopHeadlines {
  source: {
    id: string | number | null, 
    name: string
  },
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string
}