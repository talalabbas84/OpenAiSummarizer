import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
export default async function summarize(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, tone } = req.body;
  const prompt = `Summarize the following sentence in the ${tone} tone: \n\n ${text} \n\n`;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 200,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      n: 3,
      stop: ['\n\n']
      
    });
    res.status(200).json(response.data.choices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}
