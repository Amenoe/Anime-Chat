/**
 * anime 数据
 */
export interface IAnime {
  anime_id: number
  title: string
  category?: string
  cover?: string
  pub_time?: string
  update_time?: string
  description?: string
  season?: string
  rank?: string
  region?: string
  status?: string
}

export interface IAnimeEp {
  ep_id: number
  anime_id: number
  title: string
  cover: string
  first_date: string
  link: string
}

export interface IAnimeDetail {
  anime_id: IAnimeEp[]
  title: string
  category?: string
  cover?: string
  pub_time?: string
  update_time?: string
  description?: string
  season?: string
  rank?: string
  region?: string
  status?: string
}

export interface IHomeData {
  banner: IAnime[]
  hots: IAnime[]
  latest: IAnime[]
}

//登录参数
export interface ILogin {
  username: string
  password: string
}

//注册参数
export interface IRegister {
  username: string
  nickname: string
  password: string
}

export interface ILoginData {
  user_id: string
  username: string
  token: string
}

export interface IUserInfo {
  user_id: string
  username: string
  nickname: string
  avatar: string
  role: string
  status: number
  create_time: string
}
