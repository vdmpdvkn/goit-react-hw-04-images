import { useEffect } from 'react';
import { Backdrop, StyledModal } from './Modal.styled';
import propTypes from 'prop-types';
export const Modal = ({ onClose, url }) => {
  const onBackdropClose = event => {
    if (event.target.id !== 'backdrop') {
      return;
    }
    onClose();
  };
  const onEscClose = event => {
    if (event.code !== 'Escape') {
      return;
    }
    onClose();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscClose);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEscClose);
    };
  }, []);

  return (
    <Backdrop id="backdrop" onClick={onBackdropClose}>
      <StyledModal>
        <img src={url} alt="" />
      </StyledModal>
    </Backdrop>
  );
};
Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  url: propTypes.string,
};
