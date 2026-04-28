export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  content: string;
}

const posts: BlogPost[] = [
  {
    slug: "automatizar-restaurante-madrid-ia",
    title: "Cómo automatizar tu restaurante en Madrid con IA",
    description:
      "Guía práctica para restaurantes en Madrid que quieren automatizar reservas, atención al cliente y pedidos con inteligencia artificial. Casos reales y costes.",
    date: "2026-04-10",
    readTime: "6 min",
    category: "Casos de uso",
    keywords: ["automatizar restaurante madrid", "chatbot restaurante", "IA restaurante madrid", "reservas automáticas restaurante"],
    content: `
<h2>La realidad de los restaurantes en Madrid</h2>
<p>Un restaurante en Madrid recibe de media entre 30 y 80 llamadas o mensajes al día — preguntas sobre carta, reservas, horarios, disponibilidad para grupos. Si tienes una persona dedicada a esto, bien. Si no, ese tiempo lo absorbe el personal de sala o cocina, que tiene cosas más importantes que hacer.</p>
<p>La automatización no es para grandes cadenas. Es especialmente rentable para restaurantes pequeños y medianos donde cada hora cuenta.</p>

<h2>Qué puedes automatizar en tu restaurante hoy mismo</h2>
<h3>1. Reservas de mesa automáticas</h3>
<p>Un chatbot conectado a tu sistema de reservas puede gestionar toda la demanda entrante: disponibilidad, número de comensales, preferencias especiales, alergias. Todo sin que nadie descuelgue el teléfono. Los clientes reservan por WhatsApp, web o teléfono a cualquier hora.</p>

<h3>2. Confirmaciones y recordatorios</h3>
<p>El 15-20% de las reservas en restaurantes madrileños no se presentan (no-shows). Un sistema automático que envía confirmación y recordatorio 24 horas antes reduce esa cifra a menos del 5%. En un restaurante de 40 cubiertos, eso puede significar 8-10 cubiertos extra ocupados cada semana.</p>

<h3>3. Atención a consultas frecuentes</h3>
<p>Horarios, dirección, cómo llegar, si hay aparcamiento, si tienen menú del día, si admiten perros en la terraza. Un chatbot responde todo esto automáticamente. Libera al personal de sala y da respuesta inmediata al cliente a cualquier hora.</p>

<h3>4. Gestión de pedidos a domicilio</h3>
<p>Para restaurantes con servicio de delivery, un chatbot puede recibir pedidos por WhatsApp, calcular tiempos de entrega y enviar seguimiento automático. Sin plataformas intermediarias que se llevan el 30% del margen.</p>

<h2>Resultados reales en restaurantes de Madrid</h2>
<p>En Kobra AI hemos automatizado restaurantes en Madrid, desde tabernas de barrio hasta restaurantes de cocina de autor. Los resultados más comunes tras 30 días:</p>
<ul>
<li>Reducción del 80% en llamadas gestionadas por personal</li>
<li>Aumento del 12-18% en tasa de ocupación por mejor gestión de reservas</li>
<li>Reducción de no-shows del 18% al 4%</li>
<li>Atención fuera de horario: el 23% de las reservas se hacen entre las 22h y las 9h</li>
</ul>

<h2>¿Cuánto cuesta automatizar un restaurante?</h2>
<p>El setup de automatización para un restaurante en Madrid cuesta desde 800€ e incluye chatbot web, WhatsApp Business oficial y agente de voz para llamadas entrantes. El mantenimiento mensual es desde 200€.</p>
<p>La media de nuestros clientes recupera la inversión en menos de 2 meses solo con la reducción de no-shows y el aumento de reservas fuera de horario.</p>

<h2>Primer paso: auditoría gratuita</h2>
<p>Antes de hacer nada, hacemos una auditoría gratuita de tu restaurante: analizamos cuántas consultas recibes, por qué canal, a qué horas, y qué tipo de automatización tiene más impacto en tu caso concreto. Sin compromiso, sin coste.</p>
    `.trim(),
  },
  {
    slug: "chatbot-whatsapp-empresas-guia-2025",
    title: "Chatbot WhatsApp para empresas: guía completa 2025",
    description:
      "Todo lo que necesitas saber sobre chatbots de WhatsApp para empresas en 2025: cómo funcionan, qué pueden hacer, cuánto cuestan y cómo elegir el mejor para tu negocio en España.",
    date: "2026-04-15",
    readTime: "8 min",
    category: "Guías",
    keywords: ["chatbot whatsapp empresa", "whatsapp business chatbot", "chatbot whatsapp 2025", "automatización whatsapp empresa España"],
    content: `
<h2>¿Qué es un chatbot de WhatsApp para empresas?</h2>
<p>Un chatbot de WhatsApp para empresas es un sistema de inteligencia artificial que responde automáticamente a los mensajes que recibe tu empresa en WhatsApp Business. A diferencia de las respuestas automáticas básicas, un chatbot moderno mantiene conversaciones completas, entiende el contexto y realiza acciones: reservar citas, recoger datos, cualificar leads o escalar a un humano.</p>

<h2>API oficial de WhatsApp vs. soluciones no oficiales</h2>
<p>Existe una diferencia crítica que debes entender antes de implementar cualquier chatbot de WhatsApp:</p>
<h3>API oficial de Meta (la única opción segura)</h3>
<p>Es la solución aprobada por Meta para empresas. Tu número aparece verificado, no hay riesgo de bloqueo y puedes enviar notificaciones proactivas. Es lo que usan grandes empresas y lo que nosotros implementamos.</p>
<h3>Soluciones no oficiales (peligroso)</h3>
<p>Hay herramientas que conectan a WhatsApp sin API oficial usando técnicas que van contra los términos de servicio. El riesgo de bloqueo permanente del número es real. No las uses.</p>

<h2>Qué puede hacer un chatbot de WhatsApp en 2025</h2>
<p>Los chatbots de WhatsApp de 2025 son mucho más potentes que hace 3 años. Con inteligencia artificial generativa pueden:</p>
<ul>
<li>Mantener conversaciones naturales, no solo seguir un árbol de decisiones</li>
<li>Conectarse a tu CRM para personalizar respuestas según el historial del cliente</li>
<li>Reservar citas directamente en Google Calendar o Calendly</li>
<li>Enviar catálogos de productos o documentos PDF</li>
<li>Procesar pagos simples</li>
<li>Hacer seguimiento de pedidos</li>
<li>Derivar a agente humano cuando la conversación lo requiere</li>
</ul>

<h2>Cuánto cuesta un chatbot de WhatsApp para empresas en España</h2>
<p>Los precios varían enormemente según el proveedor y la complejidad del sistema. En el mercado español en 2025:</p>
<ul>
<li><strong>Setup:</strong> entre 500€ y 3.000€ según complejidad</li>
<li><strong>Mantenimiento mensual:</strong> entre 150€ y 800€</li>
<li><strong>Coste por conversación de Meta:</strong> entre 0,04€ y 0,09€ por conversación iniciada por la empresa</li>
</ul>
<p>En Kobra AI nuestros proyectos de chatbot de WhatsApp para empresas arrancan desde 800€ de setup y 200€/mes de mantenimiento. Incluimos la cuota de Meta en el mantenimiento, sin sorpresas.</p>

<h2>Cómo elegir el proveedor adecuado</h2>
<p>Antes de contratar, verifica que el proveedor:</p>
<ul>
<li>Use la API oficial de Meta (pide el Partner ID o la cuenta BSP)</li>
<li>Tenga casos de uso en tu sector</li>
<li>Ofrezca soporte en español</li>
<li>Pueda integrarse con tus herramientas actuales</li>
<li>No te ate con contratos de permanencia largos</li>
</ul>

<h2>Primeros pasos para implementar tu chatbot de WhatsApp</h2>
<p>El proceso estándar con Kobra AI dura 5 días laborables y no requiere ningún conocimiento técnico por tu parte. Empezamos con una auditoría gratuita donde analizamos tu flujo de mensajes actual y diseñamos la solución más eficiente para tu negocio.</p>
    `.trim(),
  },
  {
    slug: "agente-voz-ia-vs-recepcionista",
    title: "Agente de voz IA vs recepcionista: ¿cuál es más rentable?",
    description:
      "Comparativa detallada entre un agente de voz con inteligencia artificial y una recepcionista tradicional para empresas en España. Costes, capacidades y cuándo usar cada opción.",
    date: "2026-04-18",
    readTime: "7 min",
    category: "Comparativas",
    keywords: ["agente voz ia vs recepcionista", "recepcionista virtual IA", "coste recepcionista empresa", "agente voz inteligencia artificial empresa"],
    content: `
<h2>El debate que tienen muchos empresarios en España</h2>
<p>Cada semana hablamos con empresarios en Madrid que se plantean la misma pregunta: ¿contrato a alguien para que atienda el teléfono o invierto en un agente de voz con IA? La respuesta no es blanco o negro, pero los números tienen mucho que decir.</p>

<h2>Coste real de una recepcionista en Madrid (2025)</h2>
<p>Muchos empresarios solo ven el salario bruto, pero el coste real es otro:</p>
<ul>
<li>Salario bruto medio recepcionista Madrid: 19.000€/año</li>
<li>Seguridad Social empresa (30%): 5.700€/año</li>
<li>Vacaciones, bajas, sustituciones: ~2.500€/año</li>
<li>Formación y onboarding: ~800€/año</li>
<li><strong>Coste total anual: entre 25.000€ y 30.000€</strong></li>
</ul>
<p>Y esto para 8 horas al día, 5 días a la semana, con vacaciones en agosto cuando tus clientes siguen llamando.</p>

<h2>Coste de un agente de voz IA en 2025</h2>
<ul>
<li>Setup inicial: 800€ - 1.500€ (pago único)</li>
<li>Mantenimiento mensual: 200€ - 400€</li>
<li><strong>Coste total anual: 3.200€ - 6.300€</strong></li>
</ul>
<p>Disponible 24 horas al día, 365 días al año, sin vacaciones, sin bajas por enfermedad, sin cotizaciones.</p>

<h2>¿Qué puede y qué no puede hacer un agente de voz IA?</h2>
<h3>Lo que el agente de voz IA hace bien</h3>
<ul>
<li>Atender el 80-90% de las llamadas rutinarias: consultas de horarios, precios, disponibilidad, toma de reservas</li>
<li>Respuesta inmediata sin tiempos de espera</li>
<li>Consistencia: siempre dice lo mismo, nunca tiene un mal día</li>
<li>Disponibilidad 24/7 sin coste adicional</li>
<li>Escalar perfectamente: atiende 50 llamadas a la vez si hace falta</li>
</ul>
<h3>Lo que una recepcionista humana hace mejor</h3>
<ul>
<li>Situaciones de alta complejidad emocional (clientes muy enfadados, situaciones de crisis)</li>
<li>Tareas presenciales (recibir visitas físicamente)</li>
<li>Contexto cultural muy específico o dialectos regionales fuertes</li>
<li>Decisiones que requieren criterio y discrecionalidad compleja</li>
</ul>

<h2>La solución que funciona para la mayoría</h2>
<p>La estrategia más eficiente no es elegir uno u otro — es combinar ambos de forma inteligente. El agente de voz IA atiende el volumen alto de llamadas rutinarias y escala a la persona humana las situaciones que realmente lo necesitan. El resultado: tu equipo dedica su tiempo a lo que genera valor, no a responder "¿a qué hora abríis?" por décima vez.</p>

<h2>¿Para tu empresa tiene sentido el agente de voz IA?</h2>
<p>La regla simple: si recibes más de 15-20 llamadas al día donde el 70% o más son consultas repetitivas, el agente de voz IA te da un ROI positivo desde el primer mes. Si tus llamadas son pocas pero muy complejas y personalizadas, quizás la inversión no se justifica todavía.</p>
<p>Hacemos una auditoría gratuita donde calculamos exactamente tu caso antes de que inviertas nada.</p>
    `.trim(),
  },
  {
    slug: "automatizacion-clinicas-dentales-madrid",
    title: "Automatización de procesos para clínicas dentales en Madrid",
    description:
      "Cómo las clínicas dentales en Madrid están usando IA para automatizar citas, recordatorios y atención al paciente. Guía práctica con casos reales y resultados.",
    date: "2026-04-22",
    readTime: "6 min",
    category: "Sectores",
    keywords: ["automatización clínica dental", "chatbot clínica dental", "recordatorios citas dentista", "IA clínica dental Madrid"],
    content: `
<h2>El problema de las clínicas dentales en Madrid</h2>
<p>Una clínica dental en Madrid gestiona entre 20 y 60 citas diarias. Detrás de cada cita hay una cadena de comunicaciones: confirmación inicial, recordatorio previo, posible cancelación y reprogramación. Si lo hace una persona, ocupa entre 2 y 4 horas al día de trabajo administrativo puro.</p>
<p>A esto súmale las llamadas entrantes de pacientes nuevos, las preguntas sobre tratamientos y precios, y las urgencias fuera de horario. Es mucho volumen para una sola recepcionista.</p>

<h2>Qué procesos se pueden automatizar en una clínica dental</h2>
<h3>Gestión de citas</h3>
<p>El sistema más inmediatamente rentable. Un chatbot conectado a tu software de gestión (Gesden, Clinicpoint, DentalGest) permite a los pacientes reservar, cancelar y reprogramar citas directamente desde WhatsApp o la web — sin llamar. El 35% de las reservas de nuestras clínicas cliente se hacen fuera del horario de consulta.</p>

<h3>Recordatorios automáticos</h3>
<p>El no-show en clínicas dentales en España ronda el 18-22%. Un sistema de recordatorios automáticos por WhatsApp enviado 48 horas y 2 horas antes reduce esa cifra al 4-6%. En una clínica con 30 citas diarias, eso son entre 4 y 5 citas recuperadas cada día.</p>

<h3>Atención a pacientes nuevos</h3>
<p>El primer contacto con un paciente nuevo es crítico. Un chatbot que responde inmediatamente a las 11 de la noche cuando el paciente tiene dolor de muelas y busca clínica en Google puede marcar la diferencia entre que te elija a ti o a la clínica de enfrente.</p>

<h3>Seguimiento post-tratamiento</h3>
<p>Mensajes automáticos para comprobar cómo está el paciente después de una extracción o tratamiento. Aumenta la satisfacción del paciente y detecta complicaciones antes de que se agraven.</p>

<h2>Resultados en clínicas dentales de Madrid</h2>
<p>Datos de clínicas dentales en Madrid con más de 6 meses usando automatización con Kobra AI:</p>
<ul>
<li>Reducción de no-shows: del 20% al 5%</li>
<li>Pacientes nuevos captados fuera de horario: +28%</li>
<li>Tiempo administrativo liberado: 2,5 horas/día</li>
<li>Satisfacción del paciente (NPS): +15 puntos</li>
</ul>

<h2>Integración con software de gestión dental</h2>
<p>Nos integramos con los principales software de gestión de clínicas dentales del mercado español. Si usas un sistema específico, consúltanos — en la mayoría de los casos encontramos la forma de conectarlo.</p>

<h2>RGPD y protección de datos en clínicas</h2>
<p>Las clínicas dentales manejan datos de salud, especialmente sensibles bajo RGPD. Todos nuestros sistemas cumplen con la normativa española y europea de protección de datos. Los datos no salen de servidores en Europa y contamos con DPA (Data Processing Agreement) firmado.</p>
    `.trim(),
  },
  {
    slug: "cuanto-cuesta-chatbot-empresas-espana",
    title: "¿Cuánto cuesta un chatbot para empresas en España? Guía de precios 2025",
    description:
      "Guía completa de precios de chatbots para empresas en España en 2025. Qué factores influyen en el coste, rangos de precios reales y cómo saber si el ROI tiene sentido para tu negocio.",
    date: "2026-04-25",
    readTime: "7 min",
    category: "Guías",
    keywords: ["precio chatbot empresa", "cuánto cuesta chatbot empresas España", "coste chatbot", "presupuesto chatbot empresa"],
    content: `
<h2>El rango de precios es enorme: ¿por qué?</h2>
<p>Si buscas "chatbot para empresas precio" en Google encuentras desde 0€ (herramientas self-service) hasta 50.000€+ (desarrollos a medida para grandes corporaciones). Para una pyme en España, el rango realista está entre 500€ y 5.000€ de setup y entre 100€ y 800€/mes de mantenimiento.</p>
<p>La diferencia de precio refleja diferencias reales en lo que obtienes. En esta guía explicamos exactamente qué factores determinan el precio para que puedas comparar proveedores con criterio.</p>

<h2>Factores que determinan el precio de un chatbot</h2>
<h3>1. Complejidad del chatbot</h3>
<p>Un chatbot de árbol de decisiones (respuestas predefinidas tipo "elige una opción") es barato de crear pero limitado. Un chatbot con IA generativa que mantiene conversaciones naturales y aprende de tu negocio es más caro pero da resultados muy superiores.</p>

<h3>2. Canales de despliegue</h3>
<p>¿Solo web? ¿Web + WhatsApp? ¿Web + WhatsApp + Instagram + Telegram? Cada canal adicional añade complejidad y coste. WhatsApp Business con API oficial de Meta tiene además un coste por conversación (0,04€-0,09€) cobrado por Meta.</p>

<h3>3. Integraciones necesarias</h3>
<p>Un chatbot que solo responde preguntas cuesta menos que uno que tiene que conectarse a tu CRM, sistema de reservas, base de datos de productos y TPV. Cada integración añade tiempo de desarrollo.</p>

<h3>4. Volumen de conversaciones</h3>
<p>Algunos proveedores cobran por volumen. Si recibes 5.000 conversaciones al mes, el coste es diferente a si recibes 500.</p>

<h3>5. Soporte y mantenimiento</h3>
<p>Un chatbot que nadie monitoriza se degrada con el tiempo. El mantenimiento incluye actualización del conocimiento, mejora de respuestas, soporte técnico y ajustes según el comportamiento real de los usuarios.</p>

<h2>Rangos de precios reales en España (2025)</h2>
<h3>Soluciones self-service (0€ - 100€/mes)</h3>
<p>Plataformas como Tidio, ManyChat o Freshchat. Rápidas de configurar, pero limitadas en IA y con poca personalización. Adecuadas para negocios muy simples con volumen bajo.</p>

<h3>Agencias y proveedores especializados (800€ - 3.000€ setup + 150€ - 500€/mes)</h3>
<p>Como Kobra AI. Chatbot personalizado para tu negocio, con IA generativa, integrado en tus herramientas y con soporte en español. El nivel más eficiente para pymes.</p>

<h3>Desarrollos a medida (5.000€ - 50.000€+)</h3>
<p>Para grandes corporaciones con requisitos muy específicos, integraciones complejas con sistemas legacy o chatbots multiidioma para mercados internacionales.</p>

<h2>¿Cómo calcular el ROI antes de contratar?</h2>
<p>Antes de firmar nada, pide al proveedor que te ayude a calcular el ROI de forma honesta. Las métricas que importan:</p>
<ul>
<li>¿Cuántas consultas al mes gestionará el chatbot? (libera tiempo de tu equipo)</li>
<li>¿Cuántos leads o ventas puede generar fuera de horario?</li>
<li>¿Cuánto cuesta ahora gestionar esas consultas manualmente?</li>
</ul>
<p>En Kobra AI hacemos esta auditoría gratis antes de presentar ninguna propuesta. Si el ROI no tiene sentido para tu caso, te lo decimos. No nos interesa venderte algo que no te va a funcionar.</p>

<h2>Precio de Kobra AI para empresas en Madrid</h2>
<p>Nuestros proyectos de chatbot para empresas arrancan desde 800€ de setup y 200€/mes de mantenimiento. Incluimos chatbot web + WhatsApp Business, IA generativa entrenada en tu negocio, integraciones básicas (Google Calendar, CRM) y soporte en español. Sin permanencia mínima.</p>
    `.trim(),
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
