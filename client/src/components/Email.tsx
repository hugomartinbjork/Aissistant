import { StandardButton } from './StandardButton'

interface Props {
  body: string
  subject?: string
}
const Email = (props: Props) => {
  const handleEmailClick = () => {
    const mailtoLink = `mailto:?subject=${props.subject}&body=${props.body}`

    window.location.href = mailtoLink
  }

  return (
    <div>
      <StandardButton onClick={handleEmailClick} text="Send as Email" />
    </div>
  )
}

export default Email
