import { TagConsultaDTO } from "./tag-consulta-dto.model";

export class PublicacaoCadastroDTO {
  idUsuario: number;
  titulo: string;
  publicacao: string;
  dataInicio: Date;
  visualizacoes: number;
  tags: TagConsultaDTO[] = [];
}
