class CaracterProduct {
  nome: string;
  descricao: string;
}

class ImageProduct {
  url: string;
  descricao: string;
}

export class ProductEntity {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  caracteristicas: CaracterProduct[];
  imagens: ImageProduct[];
  categoria: string;
}
