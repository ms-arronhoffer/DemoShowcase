import {
  makeStyles,
  tokens,
  Switch,
  Text,
} from "@fluentui/react-components";
import { GridDots24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${tokens.spacingHorizontalXXL}`,
    height: "56px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow4,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
  },
  brandText: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
});

interface NavBarProps {
  title: string;
  darkMode: boolean;
  onToggleDark: () => void;
}

export function NavBar({ title, darkMode, onToggleDark }: NavBarProps) {
  const styles = useStyles();
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <GridDots24Regular />
        <Text className={styles.brandText}>{title}</Text>
      </div>
      <div className={styles.controls}>
        <Switch
          checked={darkMode}
          onChange={onToggleDark}
          label={darkMode ? "Dark" : "Light"}
        />
      </div>
    </nav>
  );
}
