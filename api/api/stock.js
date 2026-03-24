// api/stock.js
module.exports = async (req, res) => {
  // Define o catálogo de peças simulado
  const simulatedStock = [
    {
      "id_peca": "P001",
      "nome_peca": "Pastilha de Freio Dianteira",
      "marca": "Bosch",
      "compatibilidade": ["Fiat Palio 2010-2015", "Fiat Siena 2010-2015", "VW Gol G5 2008-2012"],
      "disponibilidade": 10,
      "preco": 120.50,
      "url_foto": "https://i.imgur.com/example1.jpg",
      "tipo_peca": "Original",
      "alternativas_compativeis": ["P002", "P003"]
    },
    {
      "id_peca": "P002",
      "nome_peca": "Pastilha de Freio Dianteira",
      "marca": "Fras-le",
      "compatibilidade": ["Fiat Palio 2010-2015", "Fiat Siena 2010-2015", "VW Gol G5 2008-2012"],
      "disponibilidade": 5,
      "preco": 85.00,
      "url_foto": "https://i.imgur.com/example2.jpg",
      "tipo_peca": "Paralela de Qualidade",
      "alternativas_compativeis": ["P001", "P003"]
    },
    {
      "id_peca": "P003",
      "nome_peca": "Pastilha de Freio Dianteira",
      "marca": "Paralela Genérica",
      "compatibilidade": ["Fiat Palio 2010-2015", "Fiat Siena 2010-2015", "VW Gol G5 2008-2012"],
      "disponibilidade": 20,
      "preco": 50.00,
      "url_foto": "https://i.imgur.com/example3.jpg",
      "tipo_peca": "Paralela Econômica",
      "alternativas_compativeis": ["P001", "P002"]
    },
    {
      "id_peca": "P004",
      "nome_peca": "Filtro de Óleo",
      "marca": "Mann Filter",
      "compatibilidade": ["Ford Ka 2015-2020", "Ford Fiesta 2015-2020"],
      "disponibilidade": 15,
      "preco": 45.00,
      "url_foto": "https://i.imgur.com/example4.jpg",
      "tipo_peca": "Original",
      "alternativas_compativeis": []
    },
    {
      "id_peca": "P005",
      "nome_peca": "Amortecedor Traseiro",
      "marca": "Cofap",
      "compatibilidade": ["Chevrolet Onix 2013-2019", "Chevrolet Prisma 2013-2019"],
      "disponibilidade": 8,
      "preco": 280.00,
      "url_foto": "https://i.imgur.com/example5.jpg",
      "tipo_peca": "Original",
      "alternativas_compativeis": []
    }
  ];

  // Extrai os parâmetros da requisição (query parameters ou body)
  const { requestedPart, vehicleModel, vehicleYear } = req.query || req.body;

  let foundParts = [];
  if (requestedPart) {
    foundParts = simulatedStock.filter(part => 
      part.nome_peca.toLowerCase().includes(requestedPart.toLowerCase()) &&
      (!vehicleModel || part.compatibilidade.some(comp => comp.toLowerCase().includes(vehicleModel.toLowerCase()))) &&
      (!vehicleYear || part.compatibilidade.some(comp => comp.includes(vehicleYear)))
    );
  }

  // Retorna as peças encontradas
  res.status(200).json({
    foundParts: foundParts,
    simulatedStock: simulatedStock // Opcional: para referência, pode ser removido em produção
  });
};
