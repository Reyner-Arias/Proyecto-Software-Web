import { SafeResourceUrl } from "@angular/platform-browser";
import { Tag } from "./tag.model";

export interface Videogame {
    titulo: string;
    usuario: string;
    sinopsis: string;
    portada: {data: ArrayBuffer, tipoImagen: string};
    imagen: SafeResourceUrl | undefined;
    tags: Tag [];
    facebook: {data: ArrayBuffer, tipoImagen: string};
    imagenFacebook: SafeResourceUrl | undefined;
    instagram: {data: ArrayBuffer, tipoImagen: string};
    imagenInstagram: SafeResourceUrl | undefined;
    twitter: {data: ArrayBuffer, tipoImagen: string};
    imagenTwitter: SafeResourceUrl | undefined;
}