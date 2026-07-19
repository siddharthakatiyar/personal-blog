"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sounds } from "@/lib/sounds";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sounds) {
      setEnabled(sounds.isEnabled);
    }
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 opacity-50">
        <VolumeX className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle sound</span>
      </Button>
    );
  }

  const toggleSound = () => {
    if (sounds) {
      const isNowEnabled = sounds.toggle();
      setEnabled(isNowEnabled);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9"
      onClick={toggleSound}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {enabled ? (
        <Volume2 className="h-[1.2rem] w-[1.2rem] text-primary" />
      ) : (
        <VolumeX className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle sound</span>
    </Button>
  );
}
