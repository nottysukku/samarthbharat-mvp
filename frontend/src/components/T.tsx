import { useTranslation } from '../hooks/useTranslation'

type TProps = {
  children: string
}

export default function T({ children }: TProps) {
  const translated = useTranslation(children)
  return <>{translated}</>
}
