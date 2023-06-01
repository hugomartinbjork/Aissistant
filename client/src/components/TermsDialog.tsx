import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
  handleClose: any
}
export const TermsDialog = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle
        style={{
          color: 'white',
          backgroundColor: 'black',
          border: '3px solid white',
          borderBottom: 'none',
        }}
      >
        Terms and Conditions
      </DialogTitle>
      <DialogContent
        style={{
          backgroundColor: 'black',
          border: '3px solid white',
          borderTop: 'none',
          color: 'black',
        }}
      >
        <DialogContentText style={{ color: 'white' }}>
          These terms and conditions (Agreement) set forth the general terms and
          conditions of your use of the [insert name of web app] website and any
          of its related products and services (collectively, Service). This
          Agreement is legally binding between you (User, you or your) and
          [insert name of web app] ([insert name of web app], we, us or our). By
          accessing and using the Service, you acknowledge that you have read,
          understood, and agree to be bound by the terms of this Agreement. If
          you are entering into this Agreement on behalf of a business or other
          legal entity, you represent that you have the authority to bind such
          entity to this Agreement, in which case the terms User, you or your
          shall refer to such entity. If you do not have such authority, or if
          you do not agree with the terms of this Agreement, you must not accept
          this Agreement and may not access and use the Service.
          <br />
          <br />
          You acknowledge that we may collect and store your name and email
          address (User Information) as part of your use of the Service. Your
          User Information will only be used for the purpose of providing you
          with the Service and for communication related to the Service. We will
          never share your User Information with third parties for marketing
          purposes. Your User Information will be stored securely on our servers
          for as long as your account remains active. You may delete your
          account and associated User Information at any time.
          <br />
          <br />
          You agree to use the Service only for lawful purposes and in
          accordance with this Agreement. You agree not to use the Service:
          <br />
          <br />
          <ul>
            <li>
              In any way that violates any applicable federal, state, local, or
              international law or regulation (including, without limitation,
              any laws regarding the export of data or software to and from the
              US or other countries).
            </li>
            <li>
              For the purpose of exploiting, harming, or attempting to exploit
              or harm minors in any way by exposing them to inappropriate
              content, asking for personally identifiable information, or
              otherwise.
            </li>
            <li>
              To impersonate or attempt to impersonate [insert name of web app],
              a [insert name of web app] employee, another user, or any other
              person or entity.
            </li>
            <li>
              To engage in any other conduct that restricts or inhibits anyones
              use or enjoyment of the Service, or which, as determined by us,
              may harm [insert name of web app] or users of the Service or
              expose them to liability.
            </li>
          </ul>
          <br />
          <br />
          We reserve the right to terminate or suspend your account and access
          to the Service immediately, without prior notice or liability, for any
          reason whatsoever, including, without limitation, if you breach this
          Agreement.
          <br />
          <br />
          This Agreement constitutes the entire agreement between [insert name
          of web app] and you concerning the subject matter hereof and
          supersedes all prior or contemporaneous communications and proposals,
          whether oral or written, between the parties with respect to such
          subject matter. A printed version of this Agreement and of any notice
          given in electronic form shall be admissible in judicial or
          administrative proceedings based upon or relating to this Agreement to
          the same extent and subject to the same conditions as other business
          documents and records originally generated and maintained in printed
          form.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          color: 'white',
          backgroundColor: 'black',
          border: '3px solid white',
          borderTop: 'none',
        }}
      >
        <Button
          style={{ border: '1px solid white', color: 'white' }}
          onClick={props.handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
