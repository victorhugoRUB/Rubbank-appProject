import { Modal, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface LoadingSpinnerProps {
  visible: boolean;
}

const SpinnerContainer = styled.View`
  background-color: 'rgba(0, 0, 0, 0.4)';
  padding: 100% 0;
`;

export function LoadingSpinner({ visible }: LoadingSpinnerProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={() => {  }}>
      <SpinnerContainer>
        <ActivityIndicator size={70} color="#1D1C3E" />
      </SpinnerContainer>
    </Modal>
  );
}
