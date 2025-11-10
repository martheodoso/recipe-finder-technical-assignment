import React from "react";
import { render, screen } from "@testing-library/react";
import Video from "./Video";

describe("Video component", () => {
  it("renders the video tutorial heading", () => {
    render(
      <Video
        videoLink="https://mock-url/watch?v=dQw4w"
        title="Test Recipe"
        className="test-class"
      />
    );
    expect(screen.getByText("Video Tutorial:")).toBeInTheDocument();
  });

  it("renders the iframe with correct title", () => {
    render(
      <Video
        videoLink="https://mock-url/watch?v=dQw4w"
        title="Test Recipe"
        className="test-class"
      />
    );
    const iframe = screen.getByTitle("Test Recipe video");
    expect(iframe).toBeInTheDocument();
  });

  it("transforms videoLink to embed format if needed", () => {
    render(
      <Video
        videoLink="https://www.mock-url/watch?v=dQw4w9"
        title="Embed Test"
        className=""
      />
    );
    const iframe = screen.getByTitle("Embed Test video") as HTMLIFrameElement;
    expect(iframe.src).toContain("embed/dQw4w9");
  });

  it("uses embed link directly if provided", () => {
    render(
      <Video
        videoLink="https://mock-url/embed/dQw4w"
        title="Direct Embed"
        className=""
      />
    );
    const iframe = screen.getByTitle("Direct Embed video") as HTMLIFrameElement;
    expect(iframe.src).toContain("embed/dQw4w");
  });

  it("does not render anything if videoLink is empty", () => {
    const { container } = render(
      <Video videoLink="" title="No Video" className="" />
    );
    expect(container.firstChild).toBeNull();
  });
});