import { SafeResourceUrl } from "@angular/platform-browser";
import { Tag } from "./tag.model";

export interface Videogame {
    titulo: string;
    usuario: string;
    sinopsis: string;
    juegoZip:  {data: {data: ArrayBuffer, type: String}, tipoArchivo: String};
    filepath: String;
    portada: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagen: SafeResourceUrl | undefined;
    imagepath: String;
    tags: Tag [];
    facebook: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagenFacebook: SafeResourceUrl | undefined;
    facepath: String;
    instagram: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagenInstagram: SafeResourceUrl | undefined;
    instapath: String;
    twitter: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagenTwitter: SafeResourceUrl | undefined;
    twitterpath: String;
}