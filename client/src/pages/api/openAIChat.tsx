import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai'

const MAX_TOKENS = 3000
//encode uri component i fetch anropet
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
// Fixa limit per användare
const openai = new OpenAIApi(config)
const model: CreateCompletionRequest['model'] = 'text-davinci-003'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body
  //console.log(prompt, 'prompt ', req.body)
  const completion = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.7,
      max_tokens: MAX_TOKENS,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .catch((error) => {
      console.error(error.response?.data)
      throw new Error(JSON.stringify(error.response?.data))
    })
  if (
    completion.data.usage &&
    completion.data.usage.total_tokens > MAX_TOKENS
  ) {
    throw new Error(
      `MAX_TOKENS limit exceeded. Used ${completion.data.usage.total_tokens} tokens, limit is ${MAX_TOKENS}`
    )
  }
  res.json({ prompt: completion.data.choices[0].text })
}
