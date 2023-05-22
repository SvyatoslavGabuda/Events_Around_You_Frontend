export interface Ievento {
  idLuogo: number;
  lat: number;
  lng: number;
  title: string;
  subTitle: string;
  description: string;
  urlImage: string;
  indirizzzo: IIndirizzo;
  likeDaUtenti: IuserProfile[];
  startDate: Date;
  endDate: Date;
  commenti: Icommento[];
  duration: number;
  numMaxPartecipants: number;
  creatore: IuserProfile;
  bloccato: boolean;
  sponsored: boolean;
}
export interface IIndirizzo {
  id_indirizzo: number;
  via: string;
  civico: number;
  citta: string;
  cap: number;
  provincia: string;
}
export interface IluogoDiInteresse {
  idLuogo: number;
  lat: number;
  lng: number;
  title: string;
  subTitile: string;
  description: string;
  urlImage: string;
  indirizzo: IIndirizzo;
  likeDaUtenti: IuserProfile[];
  starDate: Date;
  endDate: Date;
  startTime: number;
  duration: number;
  numMaxPartecipants: number;
  creatore: IuserProfile;
}
export interface Icommento {
  idCommento: number;
  titoloCommento: string;
  contenuto: string;
  raiting: number;
  dataCommento: Date;
  luogoCommentato: IluogoDiInteresse;
  utente: IuserProfile;
}
export interface Iroles {
  id: number;
  roleName: string;
}

export interface IuserProfile {
  idUtente: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  dataReggistrazione: string;
  urlImmagineProfilo: string;
  eventiCreati: Ievento[];
  likes: Ievento[];
  commenti: Icommento[];
  roles: Iroles[];
}
