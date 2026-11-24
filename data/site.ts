export const site = {
  url: 'https://dylanbmk.github.io',

  meta: {
    title: 'Dylan Mancipe | E-Portafolio - Bases de Datos 2',
    description:
      'E-portafolio académico de Dylan Arturo Mancipe Celis, estudiante de Ingeniería de Sistemas en la Universidad El Bosque: evidencias de Bases de Datos 2 en Oracle 19c, PL/SQL, MongoDB y el proyecto final.',
  },

  hero: {
    name: 'Dylan Mancipe',
    fullName: 'Dylan Arturo Mancipe Celis',
    role: 'Estudiante de Ingeniería de Sistemas',
    tagline:
      'E-portafolio académico de Bases de Datos 2: talleres en Oracle 19c, PL/SQL y MongoDB, y el proyecto final del semestre.',
    contact: 'Universidad El Bosque · Bases de Datos 2 · 2026-2',
    avatar: 'foto-dylan.jpg',
    avatarAlt: 'Foto de Dylan Mancipe',
  },

  about: {
    paragraphs: [
      'Hola, soy Dylan, estudiante de Ingeniería de Sistemas en la Universidad El Bosque.',
      'Me interesa la tecnología, el desarrollo de software y seguir aprendiendo nuevas herramientas que puedan ayudarme en mi formación profesional. En este portafolio reúno las evidencias de lo que he construido durante Bases de Datos 2.',
      {
        heading: 'Sobre mí',
        bullets: [
          'Estudiante de Ingeniería de Sistemas',
          'Interesado en tecnología y desarrollo de software',
          'En constante aprendizaje de nuevas herramientas y tecnologías',
        ],
      },
      {
        heading: 'Bases de Datos 2',
        bullets: [
          'Aprender a trabajar de manera más avanzada con bases de datos',
          'Fortalecer mis conocimientos en SQL y otras tecnologías',
          'Aplicar lo aprendido en proyectos de Ingeniería de Sistemas',
        ],
      },
      {
        heading: 'Tecnologías trabajadas en el semestre',
        techItems: ['Oracle 19c', 'SQL', 'PL/SQL', 'PostgreSQL', 'MongoDB', 'SQL Developer'],
      },
    ],
  },

  evidencias: [
    {
      id: 'taller-mql-mflix',
      titulo: 'Taller MQL — Consultas, agregación e índices en MongoDB (sample_mflix)',
      fecha: 'Noviembre 2026',
      equipo: ['Dylan Arturo Mancipe Celis', 'Juan Diego López Galvis', 'Gabriela Poveda Garcia'],
      resumen:
        'Taller de MongoDB Query Language sobre el dataset sample_mflix (películas y comentarios): consultas find sobre arreglos y campos anidados, pipelines de agregación de varias etapas, operaciones de escritura, un índice diseñado con la regla ESR y medido con explain(), y el diseño del modelo de documentos para dos casos reales.',
      aprendizajes: [
        'Consultas find sobre arreglos y documentos anidados: $all + $size, $ne sobre arreglos, $exists/$in con $or, expresiones regulares sin distinguir mayúsculas y countDocuments con el mismo filtro.',
        'Pipelines de agregación con $match, $unwind, $group, $project, $round, $slice y $sort: estadísticas por género, top de directores y películas por década (year - year % 10).',
        'Top 10 de películas más comentadas con $lookup entre comments y movies, ordenando y limitando antes del cruce para que solo se busquen 10 documentos.',
        'Colección nueva creada con $switch + $out, y luego updateMany ($set + $inc) y deleteMany, reportando matchedCount, modifiedCount y deletedCount.',
        'Índice compuesto con la regla ESR (Equality, Sort, Range) y comparación de explain("executionStats") antes y después: COLLSCAN con ordenamiento en memoria vs. IXSCAN.',
        'Diseño del modelo de documentos de una plataforma de domicilios (datos embebidos, referencias extendidas, patrón de atributos) y de una red IoT de calidad del aire en Bogotá (patrones bucket, computed y schema versioning), con documentos JSON de ejemplo.',
      ],
      tecnologias: ['MongoDB', 'MQL', 'Agregaciones', 'Índices', 'Modelado documental'],
      enlace: 'docs/taller-mql-mflix.pdf',
      snippets: [
        {
          titulo: 'Top 10 de películas más comentadas ($lookup)',
          lenguaje: 'MQL',
          codigo: `db.comments.aggregate([
  { $group: { _id: "$movie_id", num_comentarios: { $sum: 1 } } },
  { $sort: { num_comentarios: -1 } },
  { $limit: 10 },   // limitar antes del $lookup: solo 10 cruces
  { $lookup: { from: "movies", localField: "_id",
               foreignField: "_id", as: "pelicula" } },
  { $unwind: "$pelicula" },
  { $project: { _id: 0, titulo: "$pelicula.title",
                anio: "$pelicula.year", num_comentarios: 1 } }
]);`,
        },
        {
          titulo: 'Estadísticas por género (solo ratings numéricos)',
          lenguaje: 'MQL',
          codigo: `db.movies.aggregate([
  { $match: { "imdb.rating": { $type: "number" } } },
  { $unwind: "$genres" },
  { $group: {
      _id: "$genres",
      num_peliculas: { $sum: 1 },
      promedio: { $avg: "$imdb.rating" },
      maximo: { $max: "$imdb.rating" }
  } },
  { $match: { num_peliculas: { $gt: 500 } } },
  { $project: { num_peliculas: 1, maximo: 1,
                promedio: { $round: ["$promedio", 2] } } },
  { $sort: { promedio: -1 } }
]);`,
        },
        {
          titulo: 'Índice ESR: de COLLSCAN a IXSCAN',
          lenguaje: 'MQL',
          codigo: `// E: genres (igualdad)  S: imdb.rating (orden)  R: year (rango)
db.movies.createIndex({ genres: 1, "imdb.rating": -1, year: 1 });

db.movies.find(
  { genres: "Drama", year: { $gte: 2000, $lte: 2010 },
    "imdb.rating": { $gte: 8 } }
).sort({ "imdb.rating": -1 }).limit(10)
 .explain("executionStats");
// comparar totalDocsExamined, executionTimeMillis y winningPlan`,
        },
      ],
    },
    {
      id: 'taller-mongodb-airbnb',
      titulo: 'Taller MongoDB — CRUD y agregación sobre sample_airbnb',
      fecha: 'Noviembre 2026',
      equipo: ['Dylan Arturo Mancipe Celis', 'Juan Diego López Galvis'],
      resumen:
        '30 ejercicios sobre la colección listingsAndReviews de sample_airbnb, ejecutados en VS Code con la extensión de MongoDB: inserciones, consultas con filtros, actualizaciones y pipelines de agregación para analizar precios, amenities, tipos de propiedad y reseñas.',
      aprendizajes: [
        'Inserciones con insertOne/insertMany: objetos address anidados, arreglos de amenities, precios Decimal128 y un _id duplicado para mostrar el error de unicidad.',
        'Consultas con $gt, $lt, $and, $in, expresiones regulares, búsqueda en arreglos, $size, sort/limit y proyecciones sobre campos anidados (address.country, address.market).',
        'Actualizaciones con $set, $push, $inc, $pull y un upsert que inserta el listing cuando no existe.',
        'Agregaciones: precio promedio por país, top 5 de amenities con $unwind, listings por tipo de propiedad, conversión con $toInt y puntaje promedio de reseñas de los listings con 10 o más reseñas.',
        'Rangos de precio con $bucket, últimas reseñas contadas por año con $year, capacidad promedio de huéspedes por tipo de propiedad y el diseño de un $lookup para unir los listings con una colección hosts.',
      ],
      tecnologias: ['MongoDB', 'MQL', 'CRUD', 'Agregaciones', 'VS Code'],
      enlace: 'docs/taller-mongodb-crud-airbnb.pdf',
      snippets: [
        {
          titulo: 'Top 5 de amenities del dataset',
          lenguaje: 'MQL',
          codigo: `db.listingsAndReviews.aggregate([
  { $unwind: "$amenities" },
  { $group: { _id: "$amenities", frecuencia: { $sum: 1 } } },
  { $sort: { frecuencia: -1 } },
  { $limit: 5 }
]);`,
        },
        {
          titulo: 'Listings por rango de precio ($bucket)',
          lenguaje: 'MQL',
          codigo: `db.listingsAndReviews.aggregate([
  { $bucket: {
      groupBy: "$price",
      boundaries: [0, 101, 301, 1001],
      default: "1000+",
      output: { cantidad: { $sum: 1 } }
  } }
]);`,
        },
        {
          titulo: 'Upsert: actualizar o insertar',
          lenguaje: 'MQL',
          codigo: `db.listingsAndReviews.updateOne(
  { name: "Mansión de Prueba" },
  { $set: { price: NumberDecimal("1500.00"),
            "address.country": "United States" } },
  { upsert: true }
);`,
        },
      ],
    },
    {
      id: 'taller-plsql',
      titulo: 'Taller PL/SQL — Inventario y ventas de una ferretería',
      fecha: 'Octubre 2026',
      equipo: ['Dylan Arturo Mancipe Celis', 'Juan Diego López Galvis', 'Gabriela Poveda Garcia'],
      resumen:
        'Lógica de negocio completa para el inventario y las ventas de una ferretería, escrita en PL/SQL sobre Oracle 19c. Cada objeto tiene sus casos de prueba: casos válidos, datos inexistentes, valores límite y errores esperados.',
      aprendizajes: [
        'Procedimientos para registrar productos, ajustar el stock por bodega (entrada, salida y conteo físico) y crear pedidos validando cupo de crédito y clientes inactivos.',
        'Funciones para stock disponible, cupo disponible, descuentos y precio de producto, con registro centralizado de errores.',
        'Triggers de auditoría de precios, de margen mínimo por categoría y de movimiento de stock al insertar líneas de pedido.',
        'Trigger INSTEAD OF sobre una vista consolidada y un compound trigger que evita el error de tabla mutante.',
        'Paquete PKG_VENTAS con la facturación de pedidos: bloqueo de filas, cursores, validación de cupo y SAVEPOINT.',
      ],
      tecnologias: ['Oracle 19c', 'PL/SQL', 'Procedimientos', 'Funciones', 'Triggers', 'Paquetes'],
      snippets: [
        {
          titulo: 'Trigger de auditoría de cambios de precio',
          lenguaje: 'PL/SQL',
          codigo: `CREATE OR REPLACE TRIGGER TRG_PRODUCTO_AU_PRECIO
AFTER UPDATE OF precio_unitario ON PRODUCTO
FOR EACH ROW
WHEN (NEW.precio_unitario <> OLD.precio_unitario)
BEGIN
    INSERT INTO AUDITORIA_PRECIO (id_auditoria, id_producto, precio_anterior,
                                  precio_nuevo, variacion_pct)
    VALUES (SEQ_AUDITORIA.NEXTVAL, :OLD.id_producto, :OLD.precio_unitario,
            :NEW.precio_unitario,
            ROUND((:NEW.precio_unitario - :OLD.precio_unitario)
                  / :OLD.precio_unitario * 100, 2));
END TRG_PRODUCTO_AU_PRECIO;`,
        },
        {
          titulo: 'Trigger INSTEAD OF: qué se puede editar desde la vista',
          lenguaje: 'PL/SQL',
          codigo: `CREATE OR REPLACE TRIGGER TRG_V_STOCK_IO
INSTEAD OF UPDATE ON V_STOCK_CONSOLIDADO
FOR EACH ROW
BEGIN
    IF :NEW.id_producto <> :OLD.id_producto
       OR :NEW.codigo      <> :OLD.codigo
       OR :NEW.producto    <> :OLD.producto
       OR :NEW.categoria   <> :OLD.categoria
       OR :NEW.stock_total <> :OLD.stock_total THEN
        RAISE_APPLICATION_ERROR(-20040,
            'Desde la vista solo se pueden actualizar precio_unitario y stock_minimo');
    END IF;

    UPDATE PRODUCTO
    SET    precio_unitario = :NEW.precio_unitario,
           stock_minimo    = :NEW.stock_minimo
    WHERE  id_producto = :OLD.id_producto;
END TRG_V_STOCK_IO;`,
        },
        {
          titulo: 'PKG_VENTAS.SP_FACTURAR_PEDIDO (fragmento)',
          lenguaje: 'PL/SQL',
          codigo: `SAVEPOINT sp_facturar;
...
vn_descuento := FN_CALCULAR_DESCUENTO(vn_id_cliente, vn_subtotal);
vn_total     := vn_subtotal - vn_descuento;
vn_cupo      := FN_CUPO_DISPONIBLE(vn_id_cliente);

IF vn_total > vn_cupo THEN
    RAISE_APPLICATION_ERROR(-20053,
        'Cupo insuficiente: total ' || vn_total ||
        ', cupo disponible ' || vn_cupo);
END IF;
...
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK TO sp_facturar;
        SP_REGISTRAR_ERROR('PKG_VENTAS.SP_FACTURAR_PEDIDO',
                           'Pedido ' || p_id_pedido);
        RAISE;`,
        },
      ],
    },
    {
      id: 'indices-particiones',
      titulo: 'Laboratorio — Índices locales vs. globales en tablas particionadas',
      fecha: 'Septiembre 2026',
      equipo: ['Dylan Arturo Mancipe Celis', 'Juan Diego López Galvis'],
      resumen:
        'Demostración de cómo se comportan un índice local y uno global cuando una tabla particionada cambia de estructura: se elimina una partición completa y se compara el estado de ambos índices antes y después.',
      aprendizajes: [
        'Tabla de ventas particionada por RANGE sobre la fecha (enero, febrero, marzo y una partición residual).',
        'El índice local sigue operativo porque cada partición tiene su propio segmento de índice.',
        'El índice global queda UNUSABLE después del DROP PARTITION y necesita un REBUILD manual.',
        'Conclusión: el índice local es barato de mantener; el global es frágil ante cambios estructurales.',
      ],
      tecnologias: ['Oracle 19c', 'Particionamiento', 'Índices', 'Diccionario de datos'],
      snippets: [
        {
          titulo: 'Índice local vs. global después de eliminar una partición',
          lenguaje: 'SQL',
          codigo: `CREATE INDEX idx_cliente_local ON ventas (id_cliente) LOCAL;
CREATE INDEX idx_monto_global  ON ventas (monto) GLOBAL;

ALTER TABLE ventas DROP PARTITION p_2026_01;

-- El local se revisa por partición; el global queda UNUSABLE
SELECT index_name, partition_name, status FROM user_ind_partitions;
SELECT index_name, status FROM user_indexes WHERE table_name = 'VENTAS';

ALTER INDEX idx_monto_global REBUILD;`,
        },
      ],
    },
  ],

  proyectoFinal: {
    titulo: 'Proyecto final — Sistema de Gestión de Producción y Venta de Pollos de Engorde',
    organizacion: 'Los Pollos Hermanos (empresa ficticia del proyecto)',
    rol: 'Gerente del proyecto · Experto del negocio',
    estado: 'Terminado',
    periodo: '22 de octubre – 19 de noviembre de 2026',
    equipo: [
      'Dylan Arturo Mancipe Celis — Gerente de proyecto / Experto del negocio / Desarrollador',
      'Juan Diego López Galvis — Líder de base de datos e infraestructura / Desarrollador',
      'Gabriela Poveda Garcia — Líder de frontend, calidad y documentación / Desarrolladora',
    ],
    resumen:
      'Sistema web que centraliza la producción y la venta de una finca avícola de pollos de engorde, desde el ingreso de cada lote hasta el cobro de la venta, para conocer el costo real y la rentabilidad de cada lote. PostgreSQL concentra la lógica del negocio en procedimientos, funciones y triggers; MongoDB se usa en un único módulo, el seguimiento diario del crecimiento. El backend está en Java con Spring Boot y la interfaz en Angular.',
    rolDetalle:
      'Dylan fue designado gerente del proyecto por ser el integrante con mayor conocimiento del proceso productivo y comercial de los pollos de engorde: asignó las tareas y redistribuyó la carga del equipo, resolvió los desacuerdos entre áreas y validó que los supuestos, las reglas implementadas en la base de datos y el funcionamiento del sistema correspondieran a la operación real de una finca avícola. Además, decidió sobre las reglas del negocio avícola y sobre MongoDB.',
    alcance: [
      'Ocho módulos: galpones y lotes; alimentación por etapas (preiniciación días 1 a 7, iniciación 8 a 21, engorde 22 a 35 y finalización desde el día 36); sanidad; gastos, incluido el costo del beneficio; personal; comercial (clientes, pedidos por lote y ventas); cartera y entregas; y seguimiento diario del crecimiento.',
      'Mortalidad registrada a diario: la cantidad disponible se calcula con la mortalidad real y el sistema alerta cuando la mortalidad acumulada del lote supera el 5% esperado.',
      'Costo real del lote con cinco componentes: pollitos de un día, alimento al costo promedio ponderado del bulto, vitaminas y medicamentos, beneficio (sacrificio, escaldado, desplume y evisceración) y demás gastos; de ahí salen el costo por ave vendida y la rentabilidad.',
      'Reglas del negocio dentro de PostgreSQL con transacciones y excepciones: capacidad del galpón, alimento según la edad del lote, cargos autorizados, saldo y cartera vencida.',
      'MongoDB solo para el seguimiento diario (peso promedio, temperatura, humedad, muestreos y novedades del galpón), porque su estructura cambia de un día a otro; ningún dato se guarda en las dos bases.',
      'Pagos parciales y pago en línea con una pasarela en ambiente de pruebas, sin dinero real.',
      'Fuera del alcance: facturación electrónica ante la DIAN, varias sedes, nómina, inventario de medicamentos, básculas o sensores automáticos y aplicación móvil.',
    ],
    stack: [
      { categoria: 'Bases de datos', items: ['PostgreSQL (PL/pgSQL)', 'MongoDB (seguimiento diario)'] },
      { categoria: 'Backend', items: ['Java con Spring Boot', 'API REST'] },
      { categoria: 'Frontend', items: ['Angular', 'Interfaz en español'] },
      { categoria: 'Infraestructura', items: ['2 VM Ubuntu 26.04 (VirtualBox)', 'Backend y nginx en el equipo anfitrión'] },
    ],
    repositorios: [
      { nombre: 'Backend (Spring Boot + SQL)', url: 'https://github.com/JuanchoLopezGalvis/pollos_hermanos_back' },
      { nombre: 'Frontend (Angular)', url: 'https://github.com/JuanchoLopezGalvis/pollos_hermanos_front_dos' },
    ],
  },

  projectArchivePage: {
    title: 'Evidencias',
    description:
      'Evidencias y actividades desarrolladas durante la asignatura Bases de Datos 2.',
    intro:
      'Resumen de las evidencias del semestre. El detalle de cada una, con fragmentos de código, está en la página principal.',
  },

  projectArchive: [
    {
      date: 'Sep 2026',
      project: 'Índices locales vs. globales en tablas particionadas',
      role: 'Laboratorio en pareja',
      techStack: 'Oracle 19c · SQL',
      href: '#indices-particiones',
    },
    {
      date: 'Oct 2026',
      project: 'Taller PL/SQL — Ferretería',
      role: 'Taller en grupo',
      techStack: 'Oracle 19c · PL/SQL',
      href: '#taller-plsql',
    },
    {
      date: 'Oct–Nov 2026',
      project: 'Proyecto final — Pollos de engorde',
      role: 'Gerente del proyecto',
      techStack: 'PostgreSQL · MongoDB · Spring Boot · Angular',
      href: '#proyecto' as string,
    },
    {
      date: 'Nov 2026',
      project: 'Taller MQL — sample_mflix',
      role: 'Taller en grupo',
      techStack: 'MongoDB · MQL',
      href: '#taller-mql-mflix',
    },
    {
      date: 'Nov 2026',
      project: 'Taller MongoDB — CRUD y agregación (sample_airbnb)',
      role: 'Taller en pareja',
      techStack: 'MongoDB · MQL',
      href: '#taller-mongodb-airbnb',
    },
  ],

  contact: {
    email: '',
    github: 'https://github.com/dylanbmk',
    linkedin: '',
  },
} as const;

export type ProjectArchiveRow = (typeof site.projectArchive)[number];
export type Evidencia = (typeof site.evidencias)[number];
