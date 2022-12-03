/**
 * anime 数据
 */
export interface IAnime {
  anime_id: number
  title: string
  category: string
  cover: string
  pub_time: string
  update_time: string
  description: string
  season: string
  rank: string
  region: string
  status: string
}

export interface IHomeData {
  banner: IAnime[]
  hots: IAnime[]
  latest: IAnime[]
}
