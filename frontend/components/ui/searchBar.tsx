"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export const dynamic = "force-dynamic";

export function Component() {
  const [videoUrl, setVideoUrl] = useState("");
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const [selectedResolution, setSelectedResolution] = useState<string>(""); // State to store selected resolution
  const [isLoadingFormats, setIsLoadingFormats] = useState(false); // State to track loading state for formats
  const [isLoadingDownload, setIsLoadingDownload] = useState(false); // State to track loading state for download
  const [isSelectDisabled, setIsSelectDisabled] = useState(true); // State to disable select initially
  const [downloadResponse, setDownloadResponse] = useState<{
    DownloadUrl: string;
    previewUrl: string;
  } | null>(null); // State to store download response
  const [title, setTitle] = useState<string>(""); // State to store video title
  const [thumbnailURL, setThumbnailURL] = useState<string>(""); // State to store thumbnail URL
  const [duration, setDuration] = useState<string>(""); // State to store video duration

  useEffect(() => {
    // Fetch formats only on component mount
    if (videoUrl) {
      fetchFormats();
    }
  }, [videoUrl]);

  const fetchFormats = async () => {
    setIsLoadingFormats(true);
    try {

      console.log("hi");
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/formats`,
        { videoUrl },
        { timeout: 60000 }
      );
      const result = response.data;
      console.log(result);
      if (Array.isArray(result.qualities)) {
        setThemeOptions(result.qualities);
        setTitle(result.Metadata.Title);
        setThumbnailURL(result.Metadata.ThumbnailURL);
        setDuration(result.Metadata.Duration);
        setIsSelectDisabled(false); // Enable select after formats are loaded
      } else {
        console.error("Received data format is invalid:", result);
      }
    } catch (error) {
      console.error("An error occurred while fetching formats.");
      console.error(error);
    } finally {
      setIsLoadingFormats(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUrl || !selectedResolution) {
      console.error("Video URL and Resolution are required.");
      return;
    }

    setIsLoadingDownload(true);
    try {
      const formData = { videoUrl, resolution: selectedResolution };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/download`,
        formData
      );
      setDownloadResponse(response.data);
    } catch (error) {
      console.error("An error occurred while downloading.");
      console.error(error);
    } finally {
      setIsLoadingDownload(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchFormats();
  };

  const handleSelectChange = (value: string) => {
    setSelectedResolution(value);
  };

  const handlePreview = () => {
    if (downloadResponse && downloadResponse.previewUrl) {
      window.location.href = downloadResponse.previewUrl;
    }
  };

  const handleDownloadClick = () => {
    if (downloadResponse && downloadResponse.DownloadUrl) {
      window.location.href = downloadResponse.DownloadUrl;
    }
  };

  return (
    <>
      <div className="p-10 pt-20 ">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:justify-around md:flex-row justify-center justify-items-center  items-center ">
          <div className="items-center w-full max-w-md">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex rounded-md border">
                <Input
                  type="search"
                  placeholder="Enter YouTube Video URL"
                  className="rounded-l-md border-r-0 focus-visible:none"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  className="rounded-r-md"
                  disabled={isLoadingFormats}
                >
                  {isLoadingFormats ? (
                    <SpinnerIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <SearchIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="flex w-full max-w-md">
            <Select
              disabled={isSelectDisabled || isLoadingDownload}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Resolution" />
              </SelectTrigger>
              <SelectContent>
                {themeOptions.map((theme, index) => (
                  <SelectItem key={index} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex ">
            <Button
              type="button"
              onClick={handleDownload}
              disabled={
                !videoUrl ||
                !selectedResolution ||
                isLoadingDownload ||
                isSelectDisabled
              }
            >
              {isLoadingDownload ? "Converting..." : "Go"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start gap-10 md:gap-40 items-center py-10">
          {title && (
            <div className="md:mx-10 flex flex-col md:w-2/5 order-2 md:order-1 ">
              <div className=" mt-4 ">
                <h2 className="text-lg font-semibold ">{title}</h2>
                <img
                  src={thumbnailURL}
                  alt="Thumbnail"
                  className=" rounded-md mt-2 max-w-full h-auto"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Duration: {duration}
                </p>
              </div>
            </div>
          )}
          {downloadResponse && (
            <div className=" order-1 md:order-2 flex flex-row gap-5 md:gap-20">
              <div className="flex mt-4 ">
                <Button
                  onClick={handlePreview}
                  className="mr-2"
                  disabled={isLoadingDownload || isSelectDisabled}
                >
                  Preview
                </Button>
              </div>
              <div className="flex mt-4">
                <Button
                  onClick={handleDownloadClick}
                  disabled={isLoadingDownload || isSelectDisabled}
                >
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SpinnerIcon(props: any) {
  return (
    <svg
      {...props}
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path fill="currentColor" d="M12 2a10 10 0 00-1.993 19.801L12 22V2z" />
    </svg>
  );
}
