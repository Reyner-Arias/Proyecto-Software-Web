import { SafeResourceUrl } from "@angular/platform-browser";
import { Tag } from "./tag.model";

export interface Videogame {
    titulo: string;
    usuario: string;
    sinopsis: string;
    portada: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagen: SafeResourceUrl | undefined;
    tags: {id: string, name: number} [];
    facebook: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagenFacebook: SafeResourceUrl | undefined;
    instagram: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagenInstagram: SafeResourceUrl | undefined;
    twitter: {data: {data: ArrayBuffer, type: String}, tipoImagen: string};
    imagenTwitter: SafeResourceUrl | undefined;
}