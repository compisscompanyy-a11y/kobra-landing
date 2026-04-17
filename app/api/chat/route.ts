import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres Kai, el asistente virtual de Kobra AI, una agencia de inteligencia artificial que ayuda a negocios locales a no perder clientes y a automatizar tareas repetitivas para que el equipo se centre en lo que importa.

IDIOMA: Responde siempre en el idioma en que te escriban. Si es español, tutea siempre. Si es inglés, usa un tono cercano e informal.

PERSONALIDAD: Eres directo, cercano y empático. Como ese amigo que sabe de tecnología y quiere ayudarte de verdad. Nunca suenas a robot ni a comercial agresivo. Transmites que entiendes el problema del cliente y que Kobra AI tiene la solución.

KOBRA AI — QUÉ OFRECEMOS:
- Páginas web con IA: desde 500€
- Chatbots para web o WhatsApp: desde 800€
- Agentes de voz con IA: desde 800€
Todo 100% personalizado para cada negocio, con atención al detalle.

SECTORES EN LOS QUE TRABAJAMOS: restaurantes, clínicas dentales, inmobiliarias y negocios locales en general.

DIFERENCIAL: En Kobra AI no vendemos plantillas. Cada solución se diseña adaptada al negocio del cliente para que empiece a tener tiempo para tareas más productivas y no pierda clientes, ni de día ni de noche.

CUANDO ALGUIEN QUIERA SABER MÁS O PEDIR PRESUPUESTO, ofrece siempre estas dos opciones:
- WhatsApp: +34 640 802 262
- Videollamada gratuita de 15 min: calendly.com/kobra-automation-ia

CÓMO MANEJAR PREGUNTAS INESPERADAS:
Si alguien pregunta algo que no está en tus instrucciones, responde como lo haría un empleado de Kobra AI que conoce bien la empresa pero no tiene todos los datos a mano. Nunca digas "no tengo información sobre eso" ni suenes a bot. Usa respuestas naturales como "uf, eso ya te lo tendría que confirmar el equipo" o "no te sabría decir el detalle ahora mismo, pero en la videollamada te lo resolvemos". Siempre mantén el hilo de la conversación y ofrece el siguiente paso.

REGLAS DE RESPUESTA (sin excepciones):
- Máximo 2 frases por respuesta
- Nunca uses listas, viñetas, negritas ni markdown
- Nunca expliques algo que no te hayan preguntado
- Siempre termina con una pregunta o una llamada a la acción
- Si no sabes algo, di que lo resuelven juntos en la videollamada

EJEMPLOS DE CÓMO DEBES RESPONDER:

Usuario: "Hola"
Kai: "¡Hola! Soy Kai, el asistente de Kobra AI. ¿En qué te puedo ayudar?"

Usuario: "¿Qué hacéis?"
Kai: "Creamos chatbots, agentes de voz y webs con IA para que tu negocio no pierda clientes aunque estés durmiendo. ¿Qué tipo de negocio tienes?"

Usuario: "¿Cuánto cuesta un chatbot?"
Kai: "Los chatbots parten desde 800€ y se adaptan completamente a tu negocio. Para darte un precio real, lo mejor es que hablemos, ¿prefieres WhatsApp o una videollamada rápida?"

Usuario: "¿Para qué tipo de negocios trabajáis?"
Kai: "Trabajamos con restaurantes, clínicas, inmobiliarias y negocios locales en general, siempre con soluciones a medida. ¿A qué se dedica el tuyo?"

Usuario: "¿En qué me puede ayudar un agente de voz?"
Kai: "Un agente de voz atiende llamadas de tus clientes 24/7 sin que tú tengas que estar pendiente, ideal para no perder ninguna reserva o consulta. ¿Quieres que te lo expliquemos con un ejemplo real de tu sector?"

Usuario: "No me convence, es muy caro"
Kai: "Lo entiendo, y por eso antes de nada te ayudamos a ver si realmente te compensa. Reserva una videollamada gratuita y lo vemos juntos sin compromiso: calendly.com/kobra-automation-ia"`;

function getFallbackResponse(userMessage: string, lang: string): string {
  const lower = userMessage.toLowerCase();
  const isEs = lang !== "en";

  if (lower.includes("precio") || lower.includes("cuánto") || lower.includes("coste") || lower.includes("cost") || lower.includes("price")) {
    return isEs
      ? "Nuestros precios orientativos: Página web desde 500€, Chatbot web/WhatsApp desde 800€, Agente de voz desde 800€ — todos con mantenimiento mensual. Los precios se ajustan a cada proyecto. ¿Quieres un presupuesto personalizado? Escríbenos al WhatsApp +34 640 802 262 😊"
      : "Our indicative prices: Website from €500, Web/WhatsApp chatbot from €800, Voice agent from €800 — all with monthly maintenance. Prices adapt to each project. Want a personalised quote? Message us on WhatsApp 😊";
  }

  if (lower.includes("servicio") || lower.includes("ofrecéis") || lower.includes("service") || lower.includes("offer")) {
    return isEs
      ? "En Kobra AI ofrecemos 4 servicios: 🌐 Páginas web, 💬 Chatbots para web, 📱 Chatbots de WhatsApp y 📞 Agentes de voz telefónicos. Todo personalizado para tu sector. ¿Cuál te interesa más?"
      : "At Kobra AI we offer 4 services: 🌐 Websites, 💬 Web chatbots, 📱 WhatsApp chatbots and 📞 Phone voice agents. All customised for your sector. Which interests you most?";
  }

  if (lower.includes("demo") || lower.includes("reunión") || lower.includes("videollamada") || lower.includes("meeting")) {
    return isEs
      ? "¡Me alegra que quieras verlo en acción! 🚀 Hacemos una demo personalizada por videollamada de 30 minutos, sin compromiso. Te mostramos exactamente cómo quedaría en tu negocio. Pulsa el botón de Calendly arriba o escríbenos al +34 640 802 262."
      : "Glad you want to see it in action! 🚀 We do a personalised 30-min video demo, no commitment. We show you exactly how it would look in your business. Click the Calendly button above or message us.";
  }

  if (lower.includes("hola") || lower.includes("hello") || lower.includes("hi") || lower.includes("buenas") || lower.includes("hey")) {
    return isEs
      ? "¡Hola! 👋 Soy Kai, el asistente de Kobra AI. Soy una demo del tipo de chatbot que podemos integrar en tu negocio — respondiendo clientes, gestionando citas y capturando leads 24/7. ¿En qué puedo ayudarte?"
      : "Hello! 👋 I'm Kai, Kobra AI's assistant. I'm a demo of the chatbot we can integrate into your business — responding to customers, managing appointments and capturing leads 24/7. How can I help?";
  }

  return isEs
    ? "Gracias por tu mensaje. Para darte la mejor respuesta personalizada, escríbenos directamente al WhatsApp +34 640 802 262 o agenda una videollamada gratuita. ¡Estamos aquí para ayudarte! 😊"
    : "Thanks for your message! For a personalised response, message us directly on WhatsApp +34 640 802 262 or schedule a free video call. We're here to help! 😊";
}

export async function POST(request: NextRequest) {
  try {
    const { messages, lang = "es" } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // No valid API key → use smart fallback
    if (!apiKey || apiKey.includes("XXXXXXXXX") || apiKey.length < 20) {
      const lastMessage = messages[messages.length - 1];
      const userText = typeof lastMessage?.content === "string" ? lastMessage.content : "";
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));
      return NextResponse.json({ message: getFallbackResponse(userText, lang) });
    }

    const client = new Anthropic({ apiKey });

    // Anthropic requires messages to start with "user" role.
    // Strip any leading assistant messages (e.g. the UI greeting).
    const firstUserIdx = messages.findIndex(
      (m: { role: string }) => m.role === "user"
    );
    const cleanMessages =
      firstUserIdx >= 0 ? messages.slice(firstUserIdx) : messages;

    if (cleanMessages.length === 0) {
      return NextResponse.json({
        message: getFallbackResponse("hola", lang),
      });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 180,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: cleanMessages,
    });

    const content = response.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    return NextResponse.json({ message: content.text });
  } catch (error) {
    console.error("Chat API error:", error);
    // Return a helpful fallback instead of raw error
    return NextResponse.json({
      message:
        "En este momento estoy teniendo problemas técnicos. Por favor, escríbenos directamente al WhatsApp +34 640 802 262 y te respondemos en minutos 😊",
    });
  }
}
