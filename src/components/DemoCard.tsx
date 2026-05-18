import { useState } from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Badge,
  Button,
  Text,
  makeStyles,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  Video24Regular,
  Code24Regular,
  StarFilled,
  NewFilled,
} from "@fluentui/react-icons";
import type { Demo } from "../types";
import { VideoModal } from "./VideoModal";

function getVideoThumbnail(videoUrl: string | null): string | null {
  if (!videoUrl) return null;
  try {
    const url = new URL(videoUrl);
    if (url.hostname.includes("youtube.com") && url.searchParams.get("v")) {
      return `https://img.youtube.com/vi/${url.searchParams.get("v")}/hqdefault.jpg`;
    }
    if (url.hostname === "youtu.be") {
      return `https://img.youtube.com/vi/${url.pathname.slice(1)}/hqdefault.jpg`;
    }
  } catch {
    // ignore
  }
  return null;
}

const GRADIENT_COLORS = [
  "linear-gradient(135deg, #0078d4 0%, #106ebe 100%)",
  "linear-gradient(135deg, #8764b8 0%, #6b4fa0 100%)",
  "linear-gradient(135deg, #038387 0%, #005b5e 100%)",
  "linear-gradient(135deg, #c43501 0%, #a52c00 100%)",
  "linear-gradient(135deg, #107c10 0%, #0a5e0a 100%)",
];

function getGradient(id: string): string {
  const index = id.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return GRADIENT_COLORS[index % GRADIENT_COLORS.length];
}

function isNew(createdAt: string): boolean {
  return Date.now() - new Date(createdAt).getTime() < 30 * 24 * 60 * 60 * 1000;
}

const useStyles = makeStyles({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow 0.2s ease",
    ":hover": {
      boxShadow: tokens.shadow16,
    },
  },
  preview: {
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  },
  previewImg: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },
  headerBadges: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
    marginBottom: tokens.spacingVerticalXS,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
});

interface DemoCardProps {
  demo: Demo;
}

export function DemoCard({ demo }: DemoCardProps) {
  const styles = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const previewImg = demo.thumbnail_url ?? getVideoThumbnail(demo.video_url ?? null);

  return (
    <>
      <Card className={styles.card}>
        <CardPreview>
          {previewImg ? (
            <img
              className={styles.previewImg}
              src={previewImg}
              alt={demo.title}
            />
          ) : (
            <div
              className={styles.preview}
              style={{ background: getGradient(demo.id) }}
            />
          )}
        </CardPreview>

        <CardHeader
          header={
            <div>
              <div className={styles.headerBadges}>
                {demo.featured && (
                  <Tooltip content="Featured" relationship="label">
                    <Badge
                      appearance="filled"
                      color="brand"
                      icon={<StarFilled />}
                    >
                      Featured
                    </Badge>
                  </Tooltip>
                )}
                {isNew(demo.created_at) && (
                  <Badge appearance="filled" color="success" icon={<NewFilled />}>
                    New
                  </Badge>
                )}
                {demo.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} appearance="outline" color="informative">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Text weight="semibold" size={400}>
                {demo.title}
              </Text>
            </div>
          }
          description={
            <Text className={styles.description}>{demo.description}</Text>
          }
        />

        <CardFooter className={styles.footer}>
          {demo.video_url && (
            <Button
              appearance="primary"
              icon={<Video24Regular />}
              onClick={() => setModalOpen(true)}
            >
              Watch
            </Button>
          )}
          {demo.repo_url && (
            <Button
              appearance="outline"
              icon={<Code24Regular />}
              as="a"
              href={demo.repo_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Repo
            </Button>
          )}
        </CardFooter>
      </Card>

      <VideoModal
        videoUrl={demo.video_url}
        title={demo.title}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
