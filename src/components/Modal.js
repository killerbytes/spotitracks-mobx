import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.onClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClick, false);
  }
  onClick = (e) => {
    const { onToggle } = this.props;
    if (!this.node.contains(e.target)) {
      onToggle();
    }
  };

  render() {
    const { title } = this.props;
    return (
      <ModalStyle>
        <div className="modal-dialog" ref={(node) => (this.node = node)}>
          <div className="modal-title">{title}</div>
          <div className="modal-content">{this.props.children(this)}</div>
        </div>
      </ModalStyle>
    );
  }
}

export default observer(Modal);

const ModalStyle = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.overlay};

  align-items: center;
  .modal-content {
    padding: ${(props) => props.theme.spacing.md};
  }
  .modal-dialog {
    background-color: ${(props) => props.theme.backgroundElevated};
    margin: ${(props) => props.theme.spacing.md};
    width: 100%;
    @media (min-width: 576px) {
      width: 50%;
      max-width: 400px;
      margin: auto;
    }
  }
  .modal-title {
    background-color: ${(props) => `color-mix(in srgb, ${props.theme.background} 50%, transparent)`};
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  }
  form {
    margin-bottom: ${(props) => props.theme.spacing.md};
  }
  .form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;
