import { Metamorphic } from '../metamorphic'

const AFILIATES = ['amazon', 'amzn']

const isAbsolute = (url: string) => /^[a-zA-Z][a-zA-Z\d+\-.]*?:/.test(url)
const isSponsored = (url: string) => AFILIATES.some((afiliate) => isAbsolute(url) && url.includes(afiliate))

export const FILink: Metamorphic<'a', {}> = (props) => {
  const { as: Comp = 'a', ...rest } = props
  const target = isSponsored(props.href) || isAbsolute(props.href) ? '_blank' : undefined
  const rel = isSponsored(props.href) ? 'nofollow noopener sponsored' : isAbsolute(props.href) ? 'nofollow noopener' : undefined
  return <Comp target={target} rel={rel} {...rest} />
}
