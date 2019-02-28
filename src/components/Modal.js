import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const ModalStyle = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  .modal-content {
    padding: 1rem;
  }
  .modal-dialog {
    background-color: ${props => props.theme.darkBg2};
    margin: 1rem;
    width: 100%;
    @media (min-width: 576px) {
      width: 50%;
      max-width: 400px;
      margin: auto;
    }
  }
  .modal-title {
    font-size: 12px;
    color: ${props => props.theme.lightBg};
    text-align: center;
    border-bottom: 1px solid #878787;
    padding: 0.5rem 1rem;
  }
  form {
    margin-bottom: 1rem;
  }
  .form-footer {
    text-align: center;
  }
`
@observer
export default class Modal extends React.Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.onClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClick, false)
  }
  onClick = e => {
    const { onToggle } = this.props
    if (!this.node.contains(e.target)) {
      onToggle()
    }
  }

  render() {
    const { title } = this.props
    return (
      <ModalStyle>
        <div className="modal-dialog" ref={node => (this.node = node)}>
          <div className="modal-title">{title}</div>
          <div className="modal-content">{this.props.children(this)}</div>
        </div>
      </ModalStyle>
    )
  }
}
