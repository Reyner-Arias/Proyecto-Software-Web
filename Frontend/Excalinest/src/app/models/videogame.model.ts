import { SafeResourceUrl } from "@angular/platform-browser";
import { Tag } from "./tag.model";

export interface Videogame {
    _id: string;
    titulo: string;
    usuario: string;
    sinopsis: string;
    juegoZip: {data: {data: ArrayBuffer, type: string}, tipoArchivo: string};
    filepath: string;
    portada: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagen: SafeResourceUrl | undefined;
    imagepath: string;
    tags: Tag [];
    facebook: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagenFacebook: SafeResourceUrl | undefined;
    facepath: string;
    instagram: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagenInstagram: SafeResourceUrl | undefined;
    instapath: string;
    twitter: {data: {data: ArrayBuffer, type: string}, tipoImagen: string};
    imagenTwitter: SafeResourceUrl | undefined;
    twitterpath: string;
}