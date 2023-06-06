import { SafeResourceUrl } from "@angular/platform-browser";

export interface Videogame {
    _id: string;
    titulo: string;
    usuario: string;
    sinopsis: string;
    bucketId: string;
    portada: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagen: SafeResourceUrl | undefined;
    tags: number [];
    facebook: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagenFacebook: SafeResourceUrl | undefined;
    instagram: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagenInstagram: SafeResourceUrl | undefined;
    twitter: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagenTwitter: SafeResourceUrl | undefined;
    zipFile: File;
    coverFile: File;
    facebookFile: File;
    instaFile: File;
    twitterFile: File;
}