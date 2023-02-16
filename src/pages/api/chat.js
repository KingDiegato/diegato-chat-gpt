export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body
  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' })
  }
  try {
    console.log('antes del res')
    const response = await fetch('https://api.cohere.ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'BEARER 6FgRsqjHiIt3QVW5m6cJfHeNlcUpIt5LoTpAQBHg',
        'Cohere-Version': '2022-12-06'
      },
      body: JSON.stringify({
        model: 'command-xlarge-nightly',
        prompt: `Reply like a conversational ChatGPT Artificial Inteligence \n\n ${prompt}`,
        max_tokens: 758,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0.2,
        presence_penalty: 0,
        stop_sequences: ['--'],
        return_likelihoods: 'NONE'
      })
    })
    if (!response.ok) {
      console.error(response.statusText)
      return res.status(500).json({ error: 'Co:here API error' })
    }
    console.log('despues del res')

    const json = await response.json()

    console.log(json.generation[0])

    const { text } = json.generation[0]

    return res.status(200).json({ response: text })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Co:here API error' })
  }
}
