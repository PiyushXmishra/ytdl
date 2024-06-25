"use client"
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

export function Component() {
  const [videoUrl, setVideoUrl] = useState('');
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const [selectedResolution, setSelectedResolution] = useState<string>(''); // State to store selected resolution
  const [isLoadingFormats, setIsLoadingFormats] = useState(false); // State to track loading state for formats
  const [isLoadingDownload, setIsLoadingDownload] = useState(false); // State to track loading state for download
  const [isSelectDisabled, setIsSelectDisabled] = useState(true); // State to disable select initially
  const [downloadResponse, setDownloadResponse] = useState<{
    DownloadUrl: string;
    previewUrl: string;
  } | null>(null); // State to store download response

  useEffect(() => {
    setIsSelectDisabled(true); // Disable select on component mount
  }, []);

  const fetchFormats = async () => {
    setIsLoadingFormats(true);
    try {
      const response = await axios.post('http://localhost:3000/api/formats', { videoUrl });
      const result = response.data;
      setThemeOptions(result);
      setIsSelectDisabled(false); // Enable select after formats are loaded
    } catch (error) {
      console.error('An error occurred while fetching formats.');
      console.error(error);
    } finally {
      setIsLoadingFormats(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUrl || !selectedResolution) {
      console.error('Video URL and Resolution are required.');
      return;
    }

    setIsLoadingDownload(true);
    try {
      const formData = { videoUrl, resolution: selectedResolution };
      const response = await axios.post('http://localhost:3000/api/download', formData);
      setDownloadResponse(response.data);
    } catch (error) {
      console.error('An error occurred while downloading.');
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
      <div className="items-center w-full max-w-md">
        <form onSubmit={handleSearchSubmit}>
          <div className=" flex rounded-md border ">
            <Input
              type="search"
              placeholder="Enter YouTube Video URL"
              className=" rounded-l-md border-r-0 focus-visible:none"
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
        <Select disabled={isSelectDisabled || isLoadingDownload} onValueChange={handleSelectChange}>
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

      <div className="flex">
        <Button type="button" onClick={handleDownload} disabled={!videoUrl || !selectedResolution || isLoadingDownload || isSelectDisabled}>
          {isLoadingDownload ? 'Converting...' : 'Go'}
        </Button>
      </div>

      {downloadResponse && (
        <div className="flex flex-row mt-4">
          <Button onClick={handlePreview} className="mr-2" disabled={isLoadingDownload || isSelectDisabled}>
            Preview
          </Button>
          <Button onClick={handleDownloadClick} disabled={isLoadingDownload || isSelectDisabled}>
            Download
          </Button>
        </div>
      )}
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
      <path
        fill="currentColor"
        d="M12 2a10 10 0 00-1.993 19.801L12 22V2z"
      />
    </svg>
  );
}
