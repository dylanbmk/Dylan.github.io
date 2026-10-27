export const site = {
  url: 'https://dylanbmk.github.io',

  meta: {
    title: 'Dylan Mancipe | E-Portafolio - Bases de Datos 2',
    description:
      'E-portafolio académico de Dylan Arturo Mancipe Celis, estudiante de Ingeniería de Sistemas en la Universidad El Bosque: evidencias de Bases de Datos 2 en Oracle 19c, PL/SQL y proyecto final.',
  },

  hero: {
    name: 'Dylan Mancipe',
    fullName: 'Dylan Arturo Mancipe Celis',
    role: 'Estudiante de Ingeniería de Sistemas',
    tagline:
      'E-portafolio académico de Bases de Datos 2: talleres en Oracle 19c, programación en PL/SQL y el proyecto final del semestre.',
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
    titulo: 'Proyecto final — Sistema de gestión de pollos de engorde',
    organizacion: 'Los Pollos Hermanos (empresa ficticia del proyecto)',
    rol: 'Gerente del proyecto',
    estado: 'En desarrollo',
    equipo: ['Dylan Arturo Mancipe Celis', 'Juan Diego López Galvis', 'Gabriela Poveda Garcia'],
    resumen:
      'Sistema web para gestionar la producción y venta de pollos de engorde, con una base de datos relacional y una documental. Dylan lidera el proyecto por su conocimiento del negocio avícola.',
    alcance: [
      'Gestión de la producción por etapas, incluida la alimentación de cada etapa.',
      'Ventas con pasarela de pagos dentro del alcance.',
      'Facturación electrónica (DIAN) fuera del alcance por ser un proyecto académico.',
    ],
    stack: [
      { categoria: 'Bases de datos', items: ['PostgreSQL (relacional)', 'MongoDB (documental)'] },
      { categoria: 'Backend', items: ['Java Spring Boot', 'Servicio en VM Ubuntu'] },
      { categoria: 'Frontend', items: ['Angular', 'Despliegue en Netlify'] },
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
      date: '2026-2',
      project: 'Proyecto final — Pollos de engorde',
      role: 'Gerente del proyecto',
      techStack: 'PostgreSQL · MongoDB · Spring Boot · Angular',
      href: '#proyecto',
    },
    {
      date: '2026-2',
      project: 'NoSQL',
      role: 'Próximamente',
      techStack: 'MongoDB',
      href: '',
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
