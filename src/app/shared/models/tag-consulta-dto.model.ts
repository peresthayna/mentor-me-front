export class TagConsultaDTO {
  id: number;
  nome: string;
  data: Date;

  constructor(nome: string) {
    this.nome = nome;
  }
}
