import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load .env with override so user-provided keys take precedence
dotenv.config({ override: true });

const OFFICIAL_KNOWLEDGE_CONTEXT = `
=== INFORMACIÃ“N OFICIAL Y VERIFICADA DE TEAM LIFE (EQUIPO VIDA S.R.L.) ===

EMPRESA Y RESPALDO LEGAL:
- RazÃ³n Social: TEAM LIFE COMPANY S.R.L.
- Nombre Comercial: Equipo Vida S.R.L.
- NIT: 572065026 (RÃ©gimen General, emite Factura Oficial en cada compra).
- SENASAG: Certificado de Registro Sanitario No. 166/2025 emitido en Santa Cruz el 17 de Febrero de 2025.
- SEPREC: MatrÃ­cula de Comercio Vigente en Bolivia.
- Fundadores: Julian Rodriguez y Mery Ruiz (mÃ¡s de 20 aÃ±os en medicina convencional y nutriciÃ³n celular; mÃ¡s de 10 aÃ±os en Network Marketing).
- Central de Pedidos WhatsApp: +591 78945612.
- Despachos y EnvÃ­os: Cobertura garantizada y envÃ­os en menos de 24 horas hÃ¡biles a los 9 departamentos de Bolivia (La Paz, Santa Cruz, Cochabamba, Oruro, PotosÃ­, Chuquisaca, Tarija, Beni y Pando) con guÃ­a oficial.

CATÃLOGO DE FORMULACIONES BIOACTIVAS OFICIALES (5 PRODUCTOS):

1. Choco Kids+ Nutrition (ID: tl-chocokids)
- CategorÃ­a: NutriciÃ³n Celular Infantil.
- PresentaciÃ³n: Caja de sobres individuales de 8g c/u.
- Precios oficiales: Regular Bs 409 | Socio 40% OFF: Bs 245.
- Ingredientes oficiales: ProteÃ­na Aislada de Soja, Avena en Polvo, Cacao Alcalino, Mix de Vitaminas y Minerales (Calcio, Hierro Aminoquelado, Zinc), Omega 3 DHA/EPA, L-Arginina, Psyllium, Yogurt en Polvo (ProbiÃ³ticos y PrebiÃ³ticos), Miel en Polvo y Harina de Linaza.
- Â¿CONTIENE AZÃšCAR?: NO CONTIENE AZÃšCAR REFINADA. EstÃ¡ formulado y endulzado naturalmente con miel en polvo y el aporte natural de la avena.
- Para quÃ© sirve y Beneficios: Estimula el crecimiento corporal y la estatura (gracias a L-Arginina y Zinc), apoya el desarrollo cerebral, la memoria y la agudeza visual (Omega 3 DHA), alivia trastornos como el TDAH y la ansiedad escolar infantil, fortalece huesos, dientes y defensas inmunolÃ³gicas con probiÃ³ticos activos.

2. Coffee Life Premium (Ganoderma + Cordyceps Sinensis) (ID: tl-coffeelife)
- CategorÃ­a: EnergÃ­a & Foco Celular.
- PresentaciÃ³n: Caja de 30 sachets de 4.5g c/u.
- Precios oficiales: Regular Bs 359 | Socio 40% OFF: Bs 215.
- Ingredientes oficiales: CafÃ© OrgÃ¡nico de Altura, Cordyceps Sinensis, Ganoderma Lucidum y ColÃ¡geno Marino Hidrolizado.
- Para quÃ© sirve y Beneficios: Aumenta la oxigenaciÃ³n celular en sangre y la capacidad pulmonar (apoyo para asma, bronquitis), mejora la funciÃ³n renal y la vitalidad sexual, brinda neuroprotecciÃ³n (prevenciÃ³n de Alzheimer y Parkinson), aporta energÃ­a celular limpia sin provocar taquicardia ni reflujo gÃ¡strico.

3. ColÃ¡geno Marino Hidrolizado (FÃ³rmula Reforzada) (ID: tl-colageno)
- CategorÃ­a: NutriciÃ³n Celular & Articular.
- PresentaciÃ³n: Caja de 30 sobres individuales de 10g c/u (300g peso neto).
- Precios oficiales: Regular Bs 342 | Socio 40% OFF: Bs 205.
- Ingredientes oficiales: ColÃ¡geno Marino Hidrolizado de absorciÃ³n rÃ¡pida, Ãcido HialurÃ³nico, Coenzima Q10, Mix de Vitaminas y Minerales, Pulpa de AÃ§aÃ­ Liofilizado.
- Para quÃ© sirve y Beneficios: Regenera articulaciones, cartÃ­lagos, ligamentos y tendones; combate el dolor de rodillas y articulaciones; tonifica la piel y combate la flacidez y celulitis; fortalece cabello, uÃ±as y el humor vÃ­treo del ojo.

4. Inmune Plus Multi-Defensas Activas (ID: tl-inmune)
- CategorÃ­a: Inmunidad & Defensas.
- PresentaciÃ³n: Caja de 30 sobres individuales de 7g c/u (210g peso neto).
- Precios oficiales: Regular Bs 409 | Socio 40% OFF: Bs 245.
- Ingredientes oficiales: Noni Deshidratado en Polvo, GuanÃ¡bana, Camu Camu (alta concentraciÃ³n de Vitamina C quelada), Flor de Jamaica, Jengibre, CÃºrcuma y Aloe Vera.
- Para quÃ© sirve y Beneficios: Fortalece el sistema inmunolÃ³gico; acciÃ³n de choque antiviral y antibacteriana frente a gripe, tos y afecciones bronquiales; ayuda a controlar la hipertensiÃ³n; depura el hÃ­gado graso y previene enfermedades vasculares.

5. Fibernat Fibra Soluble & Detox Intestinal (ID: tl-fibernat)
- CategorÃ­a: DigestiÃ³n & Detox Intestinal.
- PresentaciÃ³n: Caja de sobres individuales de 6g c/u (Contenido Neto 50g).
- Precios oficiales: Regular Bs 159 | Socio 40% OFF: Bs 95.
- Ingredientes oficiales: Psyllium Husk orgÃ¡nico, Moringa andina, TÃ© Verde, Regaliz, Manzana Verde Liofilizada, Citrato de Magnesio y Pitahaya.
- Para quÃ© sirve y Beneficios: Normaliza las deposiciones y combate el estreÃ±imiento sin generar cÃ³licos ni irritaciÃ³n; regenera la flora intestinal con prebiÃ³ticos; favorece un vientre plano y desinflamado en 48 horas; apoya en la regulaciÃ³n de glucosa y colesterol.

COMBOS EMPRESARIALES Y AFILIACIÃ“N:
- Kit de Bienvenida (AfiliaciÃ³n BÃ¡sica 40% OFF) (ID: kit-de-bienvenida): Precio Bs 250. Incluye muestras oficiales de Fibernat, Inmune Plus y ColÃ¡geno, bolÃ­grafo ejecutivo grabado y manual. Otorga 40% de descuento vitalicio sin compras mÃ­nimas mensuales obligatorias. ComisiÃ³n de Bs 150 en mano por cada nuevo afiliado directo.
- Combo 1 Empresarial (6 Productos) (ID: combo-1-empresarial): Precio Bs 1.360 (Bs 1.125 comisionables). Incluye 2 Fibernat, 2 Inmune Plus y 2 ColÃ¡geno. 60% de ganancia en mano.
- Combo 2 Empresarial (12 Productos) (ID: combo-2-empresarial): Precio Bs 2.500 (Bs 2.057 comisionables). Incluye 4 Fibernat, 3 Inmune Plus, 4 ColÃ¡geno y 1 Coffee Life. 73% de rentabilidad.
- Combo 3 Empresarial (25 Productos) (ID: combo-3-empresarial): Precio Bs 4.650 (Bs 3.806 comisionables). Incluye 10 Fibernat, 6 Inmune Plus, 7 ColÃ¡geno y 2 Coffee Life. 87% de ganancia y activa el Bono Impulso Plus de Bs 1.500.
`;

const SYSTEM_INSTRUCTION = `
Eres la Asesora Oficial de Inteligencia Artificial de "TEAM LIFE | Equipo Vida S.R.L." en Bolivia.

Tus directrices OBLIGATORIAS son:
1. VERACIDAD ABSOLUTA: Responde ÃšNICAMENTE con la informaciÃ³n oficial verificada que se te proporciona en el contexto. No inventes ingredientes, precios, componentes ni certificaciones.
2. RESPUESTA DIRECTA Y PRECISA: Responde exactamente a la pregunta que hace el cliente. SÃ© concisa, amable, profesional y natural en espaÃ±ol.
3. PREGUNTAS ESPECÃFICAS DE PRODUCTOS:
   - Si te preguntan si un producto contiene azÃºcar (por ejemplo "Â¿Contiene azÃºcar el Choco Kid?"), responde directamente indicando con claridad que NO contiene azÃºcar refinada, y que estÃ¡ formulado y endulzado naturalmente con miel en polvo y avena.
   - Si te preguntan quÃ© ingredientes tiene un producto, enumera sus ingredientes oficiales especÃ­ficos.
   - Si te preguntan el precio, indica el precio regular oficial en Bolivianos (Bs) y la opciÃ³n con 40% de descuento para socios.
4. CERO VOLCADO INNECESARIO DE CATÃLOGO: NO enumeres todos los demÃ¡s productos, ni precios de otros artÃ­culos, ni combos, a menos que el cliente pregunte explÃ­citamente por el catÃ¡logo completo o las promociones.
5. RECONOCIMIENTO DE LÃMITES: Si la pregunta trata sobre un ingrediente, producto o dato que NO figure en la informaciÃ³n oficial provista, responde honestamente indicando que no tienes informaciÃ³n oficial confirmada para ese dato en particular, sugiriendo consultar con un asesor de la empresa o compartir la etiqueta. No inventes datos.
6. ORIENTACIÃ“N PRUDENTE EN SALUD: Si el usuario consulta sobre enfermedades, diagnÃ³sticos o afecciones mÃ©dicas de gravedad (como cÃ¡ncer, diabetes, artritis severa, etc.), ofrece una orientaciÃ³n prudente y responsable. Aclara que las formulaciones de TEAM LIFE son suplementos nutricionales bioactivos de apoyo al bienestar celular y nutricional, NO son medicamentos milagrosos ni sustituyen un tratamiento o diagnÃ³stico mÃ©dico profesional. Recomienda consultar siempre con su mÃ©dico especialista.
7. FORMATO DE RESPUESTA: Responde en texto conversacional fluido, sin markdown excesivo.
`;

export interface ChatResponse {
  reply: string;
  recommendedProductId?: string | null;
  recommendedComboId?: string | null;
}

// Map user prompt to relevant product ID if clearly focused
function detectProductFocus(text: string): string | null {
  const t = text.toLowerCase();
  if (t.includes("choco") || t.includes("kid") || t.includes("niÃ±o") || t.includes("infantil") || t.includes("crecimiento")) {
    return "tl-chocokids";
  }
  if (t.includes("cordyceps") || t.includes("coffee") || t.includes("cafe") || t.includes("cafÃ©") || t.includes("ganoderma")) {
    return "tl-coffeelife";
  }
  if (t.includes("colageno") || t.includes("colÃ¡geno") || t.includes("articulac") || t.includes("rodilla") || t.includes("piel")) {
    return "tl-colageno";
  }
  if (t.includes("inmune") || t.includes("defens") || t.includes("noni") || t.includes("gripe") || t.includes("guanabana") || t.includes("camu")) {
    return "tl-inmune";
  }
  if (t.includes("fibernat") || t.includes("fibra") || t.includes("digest") || t.includes("colon") || t.includes("estreÃ±") || t.includes("vientre") || t.includes("pitahaya")) {
    return "tl-fibernat";
  }
  return null;
}

function detectComboFocus(text: string): string | null {
  const t = text.toLowerCase();
  if (t.includes("combo 3") || t.includes("4650") || t.includes("25 prod")) return "combo-3-empresarial";
  if (t.includes("combo 2") || t.includes("2500") || t.includes("12 prod")) return "combo-2-empresarial";
  if (t.includes("combo 1") || t.includes("1360") || t.includes("6 prod")) return "combo-1-empresarial";
  if (t.includes("afiliar") || t.includes("kit") || t.includes("membresia") || t.includes("250")) return "kit-de-bienvenida";
  return null;
}

export async function generateGroundedChatResponse(
  prompt: string,
  history?: Array<{ role: string; text: string }>
): Promise<ChatResponse> {
  const trimmedPrompt = prompt.trim();
  if (!trimmedPrompt) {
    return { reply: "Por favor escribe tu consulta para poder orientarte." };
  }

  const focusedProdId = detectProductFocus(trimmedPrompt);
  const focusedComboId = detectComboFocus(trimmedPrompt);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.error("[Google Gemini Error] HTTP Code: 401 | Message: GEMINI_API_KEY no configurada en el servidor.");
    return {
      reply: "[Error de Google Gemini - CÃ³digo HTTP 401]: GEMINI_API_KEY no estÃ¡ configurada en las variables de entorno del servidor.",
      recommendedProductId: focusedProdId,
      recommendedComboId: focusedComboId,
    };
  }

  // Diagnostic ping check: if user is verifying connection explicitly
  const isDiagnosticCheck =
    trimmedPrompt.toLowerCase().includes("conexiÃ³n gemini ok") ||
    trimmedPrompt.toLowerCase().includes("conexion gemini ok");

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
        timeout: 15000,
      },
    });

    const conversationContext = history && history.length > 0
      ? "\n\nHISTORIAL RECIENTE DE LA CONVERSACIÃ“N:\n" +
        history
          .slice(-6)
          .map((m) => `${m.role === "user" ? "Cliente" : "Asistente"}: ${m.text}`)
          .join("\n")
      : "";

    const fullPrompt = `${OFFICIAL_KNOWLEDGE_CONTEXT}
${conversationContext}

Pregunta del Cliente: "${trimmedPrompt}"

InstrucciÃ³n: Responde en espaÃ±ol de forma breve, concisa y directa a la pregunta del cliente basada exclusivamente en la informaciÃ³n oficial. No agregues listas completas de otros productos ni combos salvo que el cliente lo pida.`;

    // Candidate models to query: prioritized with fast and available 3.1-flash-lite
    const candidateModels = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let responseText: string | null = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const result = await ai.models.generateContent({
            model,
            contents: isDiagnosticCheck ? trimmedPrompt : fullPrompt,
            config: isDiagnosticCheck
              ? undefined
              : {
                  systemInstruction: SYSTEM_INSTRUCTION,
                  temperature: 0.2,
                },
          });

          if (result && result.text) {
            responseText = result.text.trim();
            break;
          }
        } catch (err: any) {
          lastError = err;
          const status = err?.status || err?.code || "N/A";
          const rawMsg = err?.message || String(err);
          const safeMsg = rawMsg.replace(/AIza[0-9A-Za-z-_]{35}|AQ\.[0-9A-Za-z-_]{40,}/g, "[REDACTED_KEY]");
          console.error(`[Google Gemini API Error] Model: ${model} | Attempt: ${attempt} | HTTP Code: ${status} | Message: ${safeMsg}`);
          
          // Retry once on 503 or 429
          if (attempt === 1 && (status === 503 || status === 429)) {
            await new Promise((resolve) => setTimeout(resolve, 2500 * attempt));
          } else {
            break;
          }
        }
      }

      if (responseText) {
        break;
      }
    }

    if (responseText) {
      return {
        reply: responseText,
        recommendedProductId: isDiagnosticCheck ? null : focusedProdId,
        recommendedComboId: isDiagnosticCheck ? null : focusedComboId,
      };
    } else {
      const status = lastError?.status || lastError?.code || 500;
      const rawMsg = lastError?.message || (typeof lastError === "object" ? JSON.stringify(lastError) : String(lastError));
      const safeMsg = rawMsg.replace(/AIza[0-9A-Za-z-_]{35}|AQ\.[0-9A-Za-z-_]{40,}/g, "[REDACTED_KEY]");

      console.error(`[Google Gemini Final Error] HTTP Code: ${status} | Message: ${safeMsg}`);

      return {
        reply: `[Error de Google Gemini - CÃ³digo HTTP ${status}]: ${safeMsg}`,
        recommendedProductId: focusedProdId,
        recommendedComboId: focusedComboId,
      };
    }
  } catch (error: any) {
    const status = error?.status || error?.code || 500;
    const rawMsg = error?.message || String(error);
    const safeMsg = rawMsg.replace(/AIza[0-9A-Za-z-_]{35}|AQ\.[0-9A-Za-z-_]{40,}/g, "[REDACTED_KEY]");

    console.error(`[Google Gemini Fatal Error] HTTP Code: ${status} | Message: ${safeMsg}`);

    return {
      reply: `[Error de ConexiÃ³n Gemini - CÃ³digo HTTP ${status}]: ${safeMsg}`,
      recommendedProductId: focusedProdId,
      recommendedComboId: focusedComboId,
    };
  }
}


