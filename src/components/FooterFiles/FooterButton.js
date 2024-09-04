
import React from 'react'
import parse from 'html-react-parser'
import Link from 'next/link'
import { Button } from 'radix-ui'

const FooterButton = (props) => {
  return (
    <Link href = {props.link} target="_blank">
    <Button>
        {parse(props.svg)}
        <p className="hidden md:block">{props.name}</p>
      </Button>
    </Link>
  )
}

export default FooterButton
