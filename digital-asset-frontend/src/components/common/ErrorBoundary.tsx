import { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error("Error Boundary caught:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded-xl shadow text-center space-y-4">
                        <h2 className="text-xl font-semibold text-red-600">
                            Something went wrong
                        </h2>
                        <p className="text-gray-600">
                            Please refresh the page or contact support.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
