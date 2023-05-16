import { SafeResourceUrl } from "@angular/platform-browser";

export interface User {
    username: String;
    email: String;
    name: String;
    type: String;
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