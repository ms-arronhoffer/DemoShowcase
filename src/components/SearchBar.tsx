import { useRef, useEffect } from "react";
import { makeStyles, tokens, SearchBox } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "480px",
  },
  searchBox: {
    width: "100%",
  },
});

interface SearchBarProps {
  value: string;
  onChange: (q: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const styles = useStyles();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(_: unknown, data: { value: string }) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(data.value), 250);
  }

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={styles.root}>
      <SearchBox
        className={styles.searchBox}
        placeholder="Search demos by title, description, or tag…"
        defaultValue={value}
        onChange={handleChange}
        size="large"
      />
    </div>
  );
}

// Re-export tokens for potential reuse
export { tokens };
