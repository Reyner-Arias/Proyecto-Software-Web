import { SafeResourceUrl } from "@angular/platform-browser";

export interface Videogame {
    titulo: string;
    usuario: string;
    sinopsis: string;
    portada: {data: ArrayBuffer, tipoImagen: string};
    imagen: SafeResourceUrl | undefined;
    tags: string [];
}