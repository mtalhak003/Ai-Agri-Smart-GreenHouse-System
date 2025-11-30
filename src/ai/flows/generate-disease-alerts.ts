'use server';

/**
 * @fileOverview A disease alert generation AI agent.
 *
 * - generateDiseaseAlerts - A function that handles the generation of disease alerts based on leaf health data.
 * - GenerateDiseaseAlertsInput - The input type for the generateDiseaseAlerts function.
 * - GenerateDiseaseAlertsOutput - The return type for the generateDiseaseAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDiseaseAlertsInputSchema = z.object({
  leafHealthData: z.string().describe('The leaf health data to analyze.'),
  historicalDeviceLogs: z.string().describe('Historical IoT device logs for context.'),
});
export type GenerateDiseaseAlertsInput = z.infer<
  typeof GenerateDiseaseAlertsInputSchema
>;

const GenerateDiseaseAlertsOutputSchema = z.object({
  alertMessage: z.string().describe('The generated alert message.'),
  severity: z
    .enum(['low', 'medium', 'high'])
    .describe('The severity of the alert.'),
  suggestedActions: z
    .string()
    .describe('Suggested actions to address the potential disease.'),
});
export type GenerateDiseaseAlertsOutput = z.infer<
  typeof GenerateDiseaseAlertsOutputSchema
>;

export async function generateDiseaseAlerts(
  input: GenerateDiseaseAlertsInput
): Promise<GenerateDiseaseAlertsOutput> {
  return generateDiseaseAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDiseaseAlertsPrompt',
  input: {schema: GenerateDiseaseAlertsInputSchema},
  output: {schema: GenerateDiseaseAlertsOutputSchema},
  prompt: `You are an expert plant disease detection system. Analyze the provided leaf health data and historical device logs to identify potential diseases and generate appropriate alerts.

Leaf Health Data: {{{leafHealthData}}}
Historical Device Logs: {{{historicalDeviceLogs}}}

Based on this data, generate an alert message, determine the severity (low, medium, high), and suggest actions to address the potential disease.

Output should be formatted as a JSON object.
Alert message should be concise and informative.
Severity should reflect the urgency of the situation.
Suggested actions should be practical and actionable.
`,
});

const generateDiseaseAlertsFlow = ai.defineFlow(
  {
    name: 'generateDiseaseAlertsFlow',
    inputSchema: GenerateDiseaseAlertsInputSchema,
    outputSchema: GenerateDiseaseAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
