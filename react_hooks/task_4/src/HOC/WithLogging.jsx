import { Component } from 'react';

function WithLogging(WrappedComponent) {
  class WithLoggingComponent extends Component {
    componentDidMount() {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      console.log(`Component ${componentName} is mounted`);
    }

    componentWillUnmount() {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      console.log(`Component ${componentName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLoggingComponent.displayName = `WithLogging(${wrappedComponentName})`;

  return WithLoggingComponent;
}

export default WithLogging;
