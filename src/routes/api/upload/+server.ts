import { json } from '@sveltejs/kit';
import { createRequire } from 'module';
import type { RequestHandler } from './$types';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return json({ error: "No se proporcionó ningún archivo PDF" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);
    const text = data.text;

    const cleanText = text.replace(/\\r\\n/g, '\\n');
    const questions = [];
    const questionBlocks = cleanText.split(/(?=\\n\\s*\\d{1,3}\\s*[\\.)\\-])/g);
    
    for (const block of questionBlocks) {
      if (block.trim().length < 20) continue;
      
      const lines = block.trim().split('\\n');
      const questionTitle = lines[0];
      
      const optionsRegex = /(?:\\n|^)\\s*([A-Ea-e])\\s*[\\.)\\-]\\s*([\\s\\S]*?)(?=(?:\\n\\s*[A-Ea-e]\\s*[\\.)\\-])|$)/g;
      const optionsBlocks = Array.from(block.matchAll(optionsRegex)) as any[];
      
      let options = [];
      let qText = questionTitle;
      
      if (optionsBlocks.length > 0) {
        const firstOptionIndex = block.indexOf(optionsBlocks[0][0]);
        qText = block.substring(0, firstOptionIndex).trim();
        for (const match of optionsBlocks) {
          options.push(match[2].trim());
        }
      } else {
        qText = block.trim();
        options = ["Alternativa A (No extraída)", "Alternativa B (No extraída)", "Alternativa C (No extraída)", "Alternativa D (No extraída)"];
      }
      
      if (/^\\d{1,3}\\s*[\\.)\\-]/.test(qText)) {
        questions.push({
          id: questions.length + 1,
          text: qText,
          options: options.length > 0 ? options : ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
          correct: 0 
        });
      }
    }

    if (questions.length === 0) {
      questions.push({
        id: 1,
        text: "Error: No se pudo identificar la estructura del PDF. Asegúrese de que las preguntas inicien con un número (ej: '1.') y las alternativas con letras (ej: 'A)').",
        options: ["Entendido"],
        correct: 0
      });
    }

    return json({ success: true, questions });
  } catch (error: any) {
    console.error("Error procesando PDF:", error);
    return json({ error: error.message }, { status: 500 });
  }
};
