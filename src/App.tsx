import { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  tokens,
  Text,
  Spinner,
} from "@fluentui/react-components";
import { NavBar } from "./components/NavBar";
import { SearchBar } from "./components/SearchBar";
import { TagFilter } from "./components/TagFilter";
import { DemoCard } from "./components/DemoCard";
import { useDemos } from "./hooks/useDemos";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  hero: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalL}`,
    textAlign: "center",
  },
  heroTitle: {
    display: "block",
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  heroSubtitle: {
    display: "block",
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXXL}`,
    maxWidth: "1400px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: tokens.spacingHorizontalL,
    padding: `0 ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalXXL}`,
    maxWidth: "1400px",
    margin: "0 auto",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: tokens.spacingVerticalXXL,
  },
  emptyState: {
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    padding: tokens.spacingVerticalXXL,
  },
});

function GalleryPage() {
  const styles = useStyles();
  const {
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
  } = useDemos();

  if (loading) {
    return (
      <div className={styles.centered}>
        <Spinner size="large" label="Loading demos…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <Text style={{ color: tokens.colorPaletteRedForeground1 }}>{error}</Text>
      </div>
    );
  }

  return (
    <>
      <div className={styles.hero}>
        <Text className={styles.heroTitle}>{config?.title}</Text>
        <Text className={styles.heroSubtitle}>{config?.subtitle}</Text>
      </div>

      <div className={styles.toolbar}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggle={toggleTag}
          onClear={clearTags}
        />
      </div>

      {filteredDemos.length === 0 ? (
        <div className={styles.emptyState}>
          <Text size={400}>
            No demos match your filters. Try clearing the tag selection or changing your search.
          </Text>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredDemos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      )}
    </>
  );
}

export default function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(prefersDark);
  const styles = useStyles();

  return (
    <FluentProvider theme={darkMode ? webDarkTheme : webLightTheme}>
      <div className={styles.page}>
        <NavBar
          title="Demo Showcase"
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
        />
        <GalleryPage />
      </div>
    </FluentProvider>
  );
}
