import { ChangeEventHandler } from 'react'

interface Props {
  placeholderText: string
  onChange?: ChangeEventHandler
  maxLength?: number
  label?: string
  name?: string
  value?: string
  type?: string
  minHeight?: string
  margin?: string
}

/**
 * Reusable input field
 */
export const StandardInput = (props: Props) => {
  return (
    <div style={{ margin: props.margin || 0 }}>
      {props.label && <p>{props.label}</p>}
      <input
        placeholder={props.placeholderText}
        name={props.name}
        onChange={props.onChange}
        maxLength={props.maxLength}
        value={props.value}
        type={props.type}
        style={{
          padding: '18px',
          borderRadius: '10px',
          minWidth: '20rem',
          margin: '16px',
          minHeight: props.minHeight || 0,
        }}
      />
    </div>
  )
}
