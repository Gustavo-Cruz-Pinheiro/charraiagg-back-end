const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dbFilePath = path.join(__dirname, 'data', 'itens.db');

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Middleware para fazer parse do corpo das requisições como JSON
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Criar a tabela itens se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco TEXT NOT NULL,
      imagem TEXT NOT NULL,
      patrocinador TEXT
    );
  `);

  db.run(`
    INSERT INTO itens (nome, preco, imagem, patrocinador) VALUES
      ("Kit de Ferramentas Dexter", "R$ 529,90", "https://cdn.leroymerlin.com.br/products/jogo_de_ferramentas_108_pecas_dexter__89716123_0001_600x600.jpg",""),
      ("Jogo de Panelas Sicília Antiaderente Starflon Excellent Avelã 5 Peças", "R$ 503,40", "https://eletroangeloni.vtexassets.com/arquivos/ids/216344-800-auto?v=637829506993400000&width=800&height=auto&aspect=true",""),
      ("Ventilador", "R$ 199,90", "https://imgs.casasbahia.com.br/1543621153/1xg.jpg",""),
      ("Jogo de Lençol Casal 3 Peças Percal 400 Fios Ponto Palito", "R$ 89,02", "https://images.yampi.me/assets/stores/lindacasa/uploads/images/jogo-lencol-percal-400-fios-ponto-palito-cama-casal-3-pecas-palha-6185600aa3e23-medium.jpg",""),
      ("Aspirador de Pó", "R$ 199,00", "https://electrolux.vtexassets.com/arquivos/ids/225722-800-800?v=638209923921100000&width=800&height=800&aspect=true",""),
      ("Jogo de Cama Lençol Casal 100% Algodão 3pçs 120 Fios", "R$ 67,90", "https://m.media-amazon.com/images/I/61uejbBZPML._AC_SL1200_.jpg",""),
      ("Kit Conjunto Jogo De Facas Antianderente", "R$ 49,90", "https://a-static.mlcdn.com.br/800x560/kit-conjunto-jogo-de-facas-antianderente-kit-6-pecas-chef-cozinha-aco-inoxidavel-churrasco-prime/magaprimer/be0f17185d6a11ee9e7a4201ac185056/2c7317e45dad2660cf2ddb49a7bc7fe7.jpeg",""),
      ("Ferro de Passar Roupa", "R$ 119,90", "https://a-static.mlcdn.com.br/800x560/ferro-de-passar-roupa-a-vapor-e-a-seco-mondial-f-32-azul-e-branco/magazineluiza/236675700/1aa1eb8ad3d012cc5de7e067bff044f9.jpg",""),
      ("Jogo De Cama Lençol Casal Cinza 100% Algodão 3pçs 120 Fios", "R$ 57,00", "https://http2.mlstatic.com/D_NQ_NP_2X_942142-MLB72051217586_102023-F.webp",""),
      ("Guarda Roupa Casal", "R$ 999,99", "https://imgs.casasbahia.com.br/1555638380/3xg.jpg",""),
      ("Fritadeira Air Fry Britânia", "R$ 499,00", "https://eletroangeloni.vtexassets.com/arquivos/ids/353762-800-auto?v=638010172888200000&width=800&height=auto&aspect=true",""),
      ("Panela de Arroz Elétrica", "R$ 185,22", "https://a-static.mlcdn.com.br/800x560/panela-de-arroz-eletrica-10-xicaras-philco-ph10p/magazineluiza/238194200/f53362cdc3fdc79ef03131ac15200549.jpg",""),
      ("Faqueiro", "R$ 37,90", "https://eletroangeloni.vtexassets.com/arquivos/ids/233052-800-auto?v=637886721393000000&width=800&height=auto&aspect=true",""),
      ("Faqueiro Tramontina", "R$ 78,98", "https://a-static.mlcdn.com.br/800x560/faqueiro-tramontina-buzios-em-aco-inox-com-detalhe-24-pecas/alfixshop/13569254700/38facbb1d0062a5e1ef25e1e83b09d7a.jpeg",""),
      ("Liquidificador Philco", "R$ 189,90", "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQUvHD6ZFDaa8yqpCe5pfE6QjDfZGZHD7Ck_8fSMl3bi2SQtfuBaET-rmqjp2BJX3STHj4X0J8Yv-NSaoaFohX9CezMXu7G-mvgYG5P-DmwC6_rWD7Q8n_Q&usqp=CAE",""),
      ("Cama Box Casal", "R$ 480,70", "https://product-hub-prd.madeiramadeira.com.br/2114647/images/cfff46e2-54b9-435c-a29b-05db325a805f52200477camaboxcasalconjugadoortopedico40cm138x188x40inmetrosn007734311600x600.jpg?width=700&canvas=1:1&bg-color=FFF",""),
      ("Sanduicheira Mondial", "R$ 99,90", "https://imgs.casasbahia.com.br/55011886/1g.jpg",""),
      ("Panela Elétrica de Pressão", "R$ 349,00", "https://eletroangeloni.vtexassets.com/arquivos/ids/210067-800-auto?v=637919378093970000&width=800&height=auto&aspect=true",""),
      ("Kit 2 Travesseiro", "R$ 71,09", "https://a-static.mlcdn.com.br/800x560/kit-2-travesseiro-master-comfort-nasa-38x58x10-viscoelastico/lorraine-enxovais/k2trmccomfortnasa/f45146c99d0aa81b8b02f5853500f257.jpeg",""),
      ("Chuveiro Elétrico Lorenzetti", "R$ 99,99", "https://images-americanas.b2w.io/produtos/5211274298/imagens/chuveiro-eletrico-lorenzetti-bella-ducha-4t-ultra-220v-6800w/5211274335_1_xlarge.jpg",""),
      ("Kit Almofadas Decorativas", "R$ 81,00", "https://images.tcdn.com.br/img/img_prod/452310/kit_c_4_almofadas_cheias_decorativas_triangulo_preto_04_pecas_c_refil_66977_2_20220406112944.jpg",""),
      ("Kit Churrasqueiro", "R$ 206,72", "https://a-static.mlcdn.com.br/800x560/kit-churrasqueiro-profissional-com-7-pecas-bergner/bellunipresentes/6300570/7767c5254a6a0f9a6da6621da02d44d4.jpeg",""),
      ("Kit Vassoura + Rodo + Pá", "R$ 78,34", "https://http2.mlstatic.com/D_NQ_NP_2X_721185-MLB75105717827_032024-F.webp",""),
      ("Manta decorativa", "R$ 49,90", "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTCw0lojR_-LcDX1HRXJnWBnYykhrVUq0m4p6pt9CpP6wgvZBCJ0E6L_Btlw6TNRX819_flXGGXwLTPFe9taXllgChLXq4pEKiqod3HXZvQ&usqp=CAE",""),
      ("Prateleira", "R$ 82,90", "https://cdn.leroymerlin.com.br/products/prateleira_borda_reta_suporte_embutido_madeira_branco_60x14x3cm_spaceo_89104946_2f1a_600x600.jpg",""),
      ("Kit 12 Utensílios", "R$ 46,54", "https://m.media-amazon.com/images/I/51YtIGSb4yL._AC_SL1000_.jpg",""),
      ("Botijão de gás (botija)", "R$ 199,90", "https://a-static.mlcdn.com.br/800x560/botijao-de-gas-botija-vazio-sem-gas-13kg-p13-supergasbras/rederossi/15817528106/646ee54870bafb535f6317a8d1a1c955.jpeg",""),
      ("Jogo de Copos", "R$ 44,16", "https://a-static.mlcdn.com.br/1500x1500/jogo-de-copos-de-vidro-350ml-6-pecas-haus-pavillion/magazineluiza/231205400/394b6a49e005fc558cf3b376bd73127b.jpg",""),
      ("Conjunto de Travessas", "R$ 129,90", "https://imgs.ponto.com.br/55058982/1g.jpg",""),
      ("Aparelho de Jantar e Chá", "R$ 163,93", "https://a-static.mlcdn.com.br/1500x1500/aparelho-de-jantar-e-cha-20-pecas-biona-de-ceramica-redondo-bege-e-preto-donna/magazineluiza/237797700/d6c39b93eeeaf4041c57dff6cba8d2be.jpg",""),
      ("Aparelho De Jantar Biona", "R$ 299,90", "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/p/aparelho-de-jantar-biona-by-havan-casa-20-pecas_885240.webp",""),
      ("Gift Card Digital Netflix", "R$ 150,00", "https://images-americanas.b2w.io/produtos/4052476844/imagens/gift-card-digital-netflix-r-150-00/4052476844_1_xlarge.jpg",""),
      ("Jogo Com 6 Taças De Sobremesa", "R$ 64,99", "https://images.tcdn.com.br/img/img_prod/715985/jogo_de_tacas_de_sobremesa_aster_em_vidro_com_6_pecas_230ml_dolce_home_36325_1_64208c8a7d066133fa90bbb2d4a19809.jpg",""),
      ("Gift Card Digital Spotify", "R$ 100,00", "https://images-americanas.b2w.io/produtos/4052560448/imagens/gift-card-digital-spotify-6-meses/4052560448_1_xlarge.jpg",""),
      ("Cortina Blackout", "R$ 144,90", "https://m.media-amazon.com/images/I/71cxkoM+b7L._AC_SL1500_.jpg",""),
      ("1 mês academia", "R$ 130,00", "https://saude.sesisc.org.br/wp-content/uploads/sites/13/2023/09/Beneficios-de-fazer-academia-Para-sua-saude-e-seu-corpo-1536x1024.jpg",""),
      ("Toalha de Mesa", "R$ 88,90", "https://dohler.vtexassets.com/arquivos/ids/159198-800-auto?v=638183027968430000&width=800&height=auto&aspect=true",""),
      ("Edredom Sherpa", "R$ 189,90", "https://eletroangeloni.vtexassets.com/arquivos/ids/1179155/5135229-5135078-5135087-5135102--1-.jpg?v=638502696613500000",""),
      ("Mangueira", "R$ 54,90", "https://ae01.alicdn.com/kf/S2dc7a361047a42b4b9e51e0ba3ae35394/Mangueira-de-Jardim-Antitor-o-Chata-10-metros-Black.png_.webp",""),
      ("Cesto de Roupa", "R$ 55,90", "https://a-static.mlcdn.com.br/800x560/cesto-de-roupa-retangular-72-litros-rattan-aja/macedodistribuidora/8213d8e8300511ef867d4201ac185034/37ab8b448f688656c963c7107725e9e9.jpeg",""),
      ("Kit Cobre Leito", "R$ 104,49", "https://images.yampi.io/unsafe/fit-in/1000x1000/filters:background_color(white):upscale()/https://images.yampi.me/assets/stores/am-bordados/uploads/images/kit-cobre-leito-casalqueen-athenas-grid-azul-3-pecas-65f89a9b52310-large.png",""),
      ("Jogo Toalha", "R$ 74,99", "https://global.cdn.magazord.com.br/centraltoalhas/img/2024/02/produto/6448/jogo-5-pecas.jpg?ims=800x800",""),
      ("Toalha De Banho", "R$ 49,99", "https://rovitex.vtexassets.com/arquivos/ids/1000156-1600-auto?v=638331580883700000&width=1600&height=auto&aspect=true",""),
      ("Cadeira De Escritório", "R$ 319,00", "https://abracasa.vteximg.com.br/arquivos/ids/173909/cadeira-de-escritorio-chicago-alta-giratoria-preto-diagonal.jpg?v=637648011630770000",""),
      ("Kit Tapete de Cozinha", "R$ 43,70", "https://m.media-amazon.com/images/I/61RtmIn3TEL._AC_SL1000_.jpg",""),
      ("Tapete Sala", "R$ 139,90", "https://m.media-amazon.com/images/I/911bRWvZerL._AC_SL1500_.jpg",""),
      ("Jogo Americano Retangular 4 peças", "R$ 49,90", "https://m.media-amazon.com/images/I/91hQyo0OLXL._AC_SL1500_.jpg",""),
      ("Jogo Frigideiras", "R$ 113,90", "https://m.media-amazon.com/images/I/61iEjC8DmrL._AC_SL1082_.jpg",""),
      ("Cômoda", "R$ 241,48", "https://imgs.casasbahia.com.br/1564183983/1xg.jpg",""),
      ("Jogo De Assadeiras", "R$ 75,90", "https://http2.mlstatic.com/D_NQ_NP_2X_645054-MLB72668413368_112023-F.webp",""),
      ("Mesa De Escritório", "R$ 422,20", "https://images.kabum.com.br/produtos/fotos/sync_mirakl/324818/Mesa-De-Escrit-rio-Escrivaninha-Com-Tampo-Girat-rio-Para-Computador-Home-Office-2-Gavetas-Preta_1690383494_gg.jpg",""),
      ("Kit 5 Panos de Prato", "R$ 48,99", "https://global.cdn.magazord.com.br/centraltoalhas/img/2023/05/produto/5381/pano-2.jpg?ims=800x800",""),
      ("Sofá", "R$ 889,90", "https://images.tcdn.com.br/img/img_prod/839866/sofa_retratil_e_reclinavel_3_lugares_com_molas_1_80m_livia_suede_cinza_adonai_estofados_1941_4_15ac3332b883b7b8076e7b02f54cb46c.jpg",""),
      ("Kit 10 Potes Herméticos", "R$ 129,99", "https://m.media-amazon.com/images/I/717+18FOhgL._AC_SL1200_.jpg",""),
      ("Porta Tempero", "R$ 67,00", "https://m.media-amazon.com/images/I/61mQZfUlZDL._AC_SL1000_.jpg",""),
      ("Fruteira de Chão", "R$ 110,45", "https://product-hub-prd.madeiramadeira.com.br/3473650/images/a665825f-fbb5-47cc-9299-ab6a11cb0412bc4847b8576c1149110c5a1dd7.jpg?width=700&canvas=1:1&bg-color=FFF",""),
      ("Chaleira", "R$ 45,14", "https://m.media-amazon.com/images/I/51y2bSYzy4L._AC_SL1000_.jpg",""),
      ("Mixer Turbo", "R$ 104,41", "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRbgMiqKDcjNLDaoDLPhx9eMxG5mxxYfpJq2_v92R7MDleezfu2cpw1ggbVJvGgehivs2RumRAq-ylifNeqZ86-Hvbk-Rm2zqHc6icqNFtOLO4SqM-Z7-BhjQ&usqp=CAE",""),
      ("Panela de Pressão", "R$ 117,50", "https://a-static.mlcdn.com.br/800x560/panela-de-pressao-panelux-45l-grafite-fechamento-externo-magnific/magazineluiza/237805800/8f499fec2924bb0d0508dd548a6d47e4.jpg",""),
      ("Batedeira Planetária Mondial", "R$ 269,90", "https://a-static.mlcdn.com.br/800x560/batedeira-planetaria-mondial-preta-bp-03-b-700w-127v/lojaslebiscuit/304795736/efb14c6aab3cad183ba8953b3458de37.jpeg","");
  `);
});

// Endpoint para obter todos os itens
app.get('/api/itens', (req, res) => {
  db.all('SELECT * FROM itens', (err, rows) => {
    if (err) {
      console.error('Erro ao obter dados:', err);
      return res.status(500).json({ error: 'Erro ao obter dados' });
    }
    res.json(rows);
  });
});

// Endpoint para modificar o patrocinador de um item
app.put('/api/itens/:nomeItem', (req, res) => {
  const nomeItem = req.params.nomeItem;
  const novoPatrocinador = req.body.patrocinador;

  const query = `UPDATE itens SET patrocinador = ? WHERE nome = ?`;
  db.run(query, [novoPatrocinador, nomeItem], function(err) {
    if (err) {
      console.error('Erro ao atualizar dados:', err);
      return res.status(500).json({ error: 'Erro ao atualizar dados' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: `Item com nome '${nomeItem}' não encontrado` });
    }

    res.json({ message: 'Patrocinador modificado com sucesso' });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
