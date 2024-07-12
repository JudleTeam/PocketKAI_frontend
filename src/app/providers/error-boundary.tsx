import React from 'react';
export class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('ErrorBoundary :>> ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return 'error';
    }

    return this.props.children;
  }
}
