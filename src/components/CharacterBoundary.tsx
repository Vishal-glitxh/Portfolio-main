import { Component, PropsWithChildren } from "react";
import { useLoading } from "../context/LoadingProvider";

class OptionalCharacter extends Component<PropsWithChildren<{ onUnavailable: () => void }>, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) {
    console.warn("3D unavailable; continuing with the portfolio.", error);
    this.props.onUnavailable();
  }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function CharacterBoundary({ children }: PropsWithChildren) {
  const { setLoading } = useLoading();
  return <OptionalCharacter onUnavailable={() => setLoading(100)}>{children}</OptionalCharacter>;
}
