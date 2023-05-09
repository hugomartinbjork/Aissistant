const reWrite = async (str: string) => {
  const prompt = 'Rewrite this text: ' + str
  const body = JSON.stringify({ prompt })
  const res = await fetch('/api/openAIChat', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body,
  })
  const json = await res.json()
  return json.prompt
}

export { reWrite }
