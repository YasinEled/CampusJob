// src/types/curso.ts
export interface Curso {
    idcurso: number;
    nomcurs: string;
    desccurs: string | null;
    idcentro: number | null;
    fotoCurso?: string | null; // opcional si no siempre existe
  }