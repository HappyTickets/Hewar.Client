export interface IResponseChat {
  status: number,
  isSuccess: boolean,
  successCode: number,
  data: IChat[]
}

export interface IChat {
  id: number,
  chatId: number,
  content: string,
  medias: [
    {
      type: string,
      url: string
    }
  ],
  sentOn: string,
  representedEntity: number,
  sender: {
    id: number,
    firstName: string,
    lastName: string,
    imageUrl: string
  }
}
