import React from 'react'

interface Props {
  text: string
  onClick?: () => void
  margin?: string
  form?: string
  minWidth?: string
  padding?: string
  fontSize?: string
}

export const StandardButton = (props: Props) => {
  return (
    <button
      style={{
        border: 'solid 1px',
        borderColor: 'white',
        fontSize: props.fontSize || '20px',
        fontFamily: 'Raleway, sans-serif',
        color: 'white',
        backgroundColor: 'black',
        padding: props.padding || '16px',
        borderRadius: '10px',
        minWidth: props.minWidth || '12rem',
        maxWidth: '12rem',
        margin: props.margin,
      }}
      onMouseOver={(e) => {
        ;(e.target as HTMLElement).style.transform = 'scale(1.05)'
      }}
      onMouseOut={(e) => {
        ;(e.target as HTMLElement).style.transform = 'scale(1)'
      }}
      onClick={props.onClick}
      form={props.form}
    >
      {props.text}
    </button>
  )
}
