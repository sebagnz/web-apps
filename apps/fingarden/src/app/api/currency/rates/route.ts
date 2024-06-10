const FREE_CURRENCY_API_URL = 'https://api.freecurrencyapi.com/v1/latest'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const apikey = process.env.FREECURRENCY_API_KEY || ''
  const revalidate = 3600

  const currencies = searchParams.get('currencies')
  const base_currency = searchParams.get('base_currency')

  if (currencies === null) {
    return Response.json({ error: 'Invalid currencies provided' }, { status: 400 })
  }

  if (base_currency === null) {
    return Response.json({ error: 'Invalid base_currency provided' }, { status: 400 })
  }

  const url = `${FREE_CURRENCY_API_URL}?${new URLSearchParams({ apikey, currencies, base_currency })}`

  const res = await fetch(url, { next: { revalidate } })

  const json = await res.json()

  return Response.json(json.data)
}
