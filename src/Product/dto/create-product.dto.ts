import { CaracterProductDTO } from './caracterProduct-dto';
import { Type } from 'class-transformer';
import {
  IsUrl,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ImageProductDTO } from './ImageProduct-dto';

export class CreateProductDTO {
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracterProductDTO)
  caracteristicas: CaracterProductDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  imagens: ImageProductDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categor: string;
}
