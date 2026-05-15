import { makeStyles, tokens, Button, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  label: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    marginRight: tokens.spacingHorizontalXS,
  },
});

interface TagFilterProps {
  allTags: string[];
  selectedTags: Set<string>;
  onToggle: (tag: string) => void;
  onClear: () => void;
}

export function TagFilter({ allTags, selectedTags, onToggle, onClear }: TagFilterProps) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Text className={styles.label}>Filter:</Text>
      <Button
        appearance={selectedTags.size === 0 ? "primary" : "outline"}
        shape="circular"
        size="small"
        onClick={onClear}
      >
        All
      </Button>
      {allTags.map((tag) => (
        <Button
          key={tag}
          appearance={selectedTags.has(tag) ? "primary" : "outline"}
          shape="circular"
          size="small"
          onClick={() => onToggle(tag)}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
