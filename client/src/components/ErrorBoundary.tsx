import React from 'react';

class ErrorBoundary extends React.Component<
  {},
  { error: { message: string } }
> {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch() {
    // log the error to the server
  }
  tryAgain = () => this.setState({ error: null });
  render() {
    return this.state.error ? (
      <div>
        There was an error. <button onClick={this.tryAgain}>try again</button>
        <pre style={{ whiteSpace: 'normal' }}>{this.state.error.message}</pre>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
