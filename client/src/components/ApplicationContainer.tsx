import styled from 'styled-components';

const ApplicationContainer = styled.div`
  background: ${props => props.background};
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  overflow-x: hidden;
`;

export default ApplicationContainer;
