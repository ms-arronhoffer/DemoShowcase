import { useState, useEffect, useMemo } from "react";
import type { Demo, GalleryConfig } from "../types";

interface UseDemosResult {
  config: GalleryConfig | null;
  loading: boolean;
  error: string | null;
  allTags: string[];
  selectedTags: Set<string>;
  searchQuery: string;
  filteredDemos: Demo[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  setSearchQuery: (q: string) => void;
}

export function useDemos(): UseDemosResult {
  const [config, setConfig] = useState<GalleryConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/demos.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load demos.json: ${res.status}`);
        return res.json() as Promise<GalleryConfig>;
      })
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      });
  }, []);

  const allTags = useMemo(() => {
    if (!config) return [];
    const tagSet = new Set<string>();
    config.demos.forEach((d) => d.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [config]);

  const filteredDemos = useMemo(() => {
    if (!config) return [];
    const q = searchQuery.toLowerCase();

    const passes = (demo: Demo): boolean => {
      const tagMatch =
        selectedTags.size === 0 || demo.tags.some((t) => selectedTags.has(t));
      if (!tagMatch) return false;
      if (!q) return true;
      return (
        demo.title.toLowerCase().includes(q) ||
        demo.description.toLowerCase().includes(q) ||
        demo.tags.some((t) => t.toLowerCase().includes(q))
      );
    };

    return [...config.demos]
      .filter(passes)
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [config, selectedTags, searchQuery]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  function clearTags() {
    setSelectedTags(new Set());
  }

  return {
    config,
    loading,
    error,
    allTags,
    selectedTags,
    searchQuery,
    filteredDemos,
    toggleTag,
    clearTags,
    setSearchQuery,
  };
}
