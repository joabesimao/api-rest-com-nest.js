import { IsUrl, IsString, IsNotEmpty } from 'class-validator';
export class ImageProductDTO {
  @IsUrl()
  url: string;
  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
}
