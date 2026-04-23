import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad — Kobra AI",
  description: "Política de privacidad y protección de datos de Kobra AI. Información sobre el tratamiento de tus datos personales.",
  alternates: {
    canonical: "https://kobra.ai/privacidad",
  },
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidad</h1>
        <p className="text-zinc-500 text-sm mb-12">Última actualización: abril de 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recogidos a través de este sitio web y del servicio de WhatsApp es <strong className="text-white">Kobra AI</strong>, con domicilio en Madrid, España.
            </p>
            <p className="mt-2">
              Contacto: <a href="mailto:hola@kobra.ai" className="text-[#4ADE80] hover:underline">hola@kobra.ai</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Datos que recogemos</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Nombre y apellidos (cuando se facilitan voluntariamente)</li>
              <li>Número de teléfono (al contactar por WhatsApp)</li>
              <li>Dirección de correo electrónico (a través de formularios web)</li>
              <li>Nombre de empresa y sector de actividad</li>
              <li>Contenido de las conversaciones de WhatsApp con nuestro asistente virtual</li>
              <li>Datos de navegación web (cookies técnicas y analíticas)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Finalidad del tratamiento</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Gestionar y responder a tus consultas comerciales</li>
              <li>Prestar el servicio de asistente virtual por WhatsApp</li>
              <li>Enviar información sobre nuestros servicios cuando lo hayas solicitado</li>
              <li>Cumplir con obligaciones legales y contractuales</li>
              <li>Mejorar nuestros productos y servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Base legal del tratamiento</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Consentimiento:</strong> cuando nos facilitas tus datos voluntariamente a través de WhatsApp o formularios web.</li>
              <li><strong className="text-white">Interés legítimo:</strong> para el seguimiento comercial de las consultas recibidas.</li>
              <li><strong className="text-white">Ejecución de contrato:</strong> cuando existe una relación contractual con Kobra AI.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Plazo de conservación</h2>
            <p>
              Conservamos tus datos mientras exista una relación comercial activa o potencial. Una vez finalizada, los datos se eliminan en un plazo máximo de 24 meses, salvo obligación legal de conservarlos por más tiempo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Uso de WhatsApp Business API</h2>
            <p>
              Utilizamos la <strong className="text-white">API oficial de WhatsApp Business de Meta</strong> para gestionar las comunicaciones por WhatsApp. Esto implica que los datos intercambiados en las conversaciones son procesados por Meta Platforms, Inc., de acuerdo con su propia política de privacidad disponible en <a href="https://www.whatsapp.com/legal/privacy-policy" className="text-[#4ADE80] hover:underline" target="_blank" rel="noopener noreferrer">whatsapp.com/legal/privacy-policy</a>.
            </p>
            <p className="mt-2">
              Nuestro asistente virtual utiliza tecnología de inteligencia artificial (Anthropic Claude) para generar respuestas. Las conversaciones pueden ser procesadas por dicho servicio conforme a sus términos de uso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Destinatarios de los datos</h2>
            <p>No vendemos ni cedemos tus datos a terceros. Podemos compartirlos con:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Proveedores tecnológicos necesarios para prestar el servicio (Anthropic, Meta, HubSpot, Notion)</li>
              <li>Autoridades públicas cuando sea legalmente requerido</li>
            </ul>
            <p className="mt-2">Todos los proveedores están sujetos a acuerdos de confidencialidad y protección de datos.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Tus derechos</h2>
            <p>De acuerdo con el RGPD y la LOPDGDD, puedes ejercer los siguientes derechos:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong className="text-white">Acceso:</strong> obtener confirmación sobre si tratamos tus datos y acceder a ellos.</li>
              <li><strong className="text-white">Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong className="text-white">Supresión:</strong> solicitar la eliminación de tus datos.</li>
              <li><strong className="text-white">Limitación:</strong> solicitar la restricción del tratamiento.</li>
              <li><strong className="text-white">Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
              <li><strong className="text-white">Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, escríbenos a <a href="mailto:hola@kobra.ai" className="text-[#4ADE80] hover:underline">hola@kobra.ai</a> indicando el derecho que deseas ejercer y adjuntando una copia de tu DNI o documento identificativo.
            </p>
            <p className="mt-2">
              También puedes presentar una reclamación ante la <strong className="text-white">Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" className="text-[#4ADE80] hover:underline" target="_blank" rel="noopener noreferrer">aepd.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Cookies</h2>
            <p>
              Este sitio web utiliza cookies técnicas necesarias para su funcionamiento y cookies analíticas para entender cómo se usa el sitio. Puedes configurar tu navegador para rechazar las cookies, aunque esto puede afectar a la funcionalidad de la web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. La fecha de la última actualización aparece al inicio de este documento. Te recomendamos revisarla periódicamente.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  );
}
