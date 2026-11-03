import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIsInView } from "./useIsInView";

let callback: IntersectionObserverCallback = () => {};
const observe = vi.fn();
const disconnect = vi.fn();

class MockIntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  constructor(next: IntersectionObserverCallback) {
    callback = next;
  }
  observe = observe;
  disconnect = disconnect;
  unobserve = vi.fn();
  takeRecords = () => [];
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});
afterEach(() => vi.clearAllMocks());

function Probe() {
  const [ref, inView] = useIsInView<HTMLDivElement>();
  return <div ref={ref}>{inView ? "in-view" : "out-of-view"}</div>;
}

describe("useIsInView", () => {
  it("tracks intersection and disconnects on unmount", () => {
    const { unmount } = render(<Probe />);
    expect(screen.getByText("in-view")).toBeInTheDocument();
    act(() =>
      callback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(screen.getByText("out-of-view")).toBeInTheDocument();
    act(() =>
      callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(screen.getByText("in-view")).toBeInTheDocument();
    expect(observe).toHaveBeenCalledTimes(1);
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
