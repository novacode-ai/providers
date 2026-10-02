import { openai } from '@ai-sdk/openai';

export class ModelRouter {
    /**
     * Dynamically resolves the user's string (e.g. "gpt-4o" or "llama3") 
     * to the correct Vercel AI SDK LanguageModel provider instance.
     */
    static resolve(modelName: string): any {
        const name = modelName.toLowerCase();
        
        if (name.startsWith('gpt') || name.startsWith('o1')) {
            return openai(name);
        }
        
        if (name.startsWith('claude')) {
            throw new Error(`Model ${modelName} requires @ai-sdk/anthropic which is not yet installed.`);
        }
        
        // Fallback: Assume it's an OpenAI compatible local server (like LMStudio or Ollama proxy)
        return openai(name);
    }
}
