/// <reference types="react-scripts" />

type AlertProps = {
    message: string
}
type CurrentIMGOpen = {
    url: string,
    isOpen: boolean
}


interface IimageApi {
    comments: number,
    downloads: number,
    favorites: number,
    id: number,
    imageHeight: number,
    imageSize: number,
    imageWidth: number,
    largeImageURL: string,
    liked: boolean,
    likes: number,
    pageURL: string,
    previewHeight: number,
    previewURL: string,
    previewWidth: number,
    tags: string,
    type: string,
    user: string,
    userImageURL: string,
    user_id: number,
    views: number,
    webformatHeight: number,
    webformatURL: string,
    webformatWidth: number,
    photoId?: string,
    url?: string,
}

