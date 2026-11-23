import media from "@/generated/media.json";
import { withBasePath } from "./site";

export type Photo = { name: string; src: string; width: number; height: number };
export type LocalDocument = { name: string; src: string; size: number };

type Manifest = { hero: Photo | null; logo: Photo | null; gallery: Photo[]; documents: LocalDocument[] };

const raw = media as unknown as Manifest;

/**
 * Список файлов создаётся скриптом scripts/media-manifest.mjs перед каждой сборкой,
 * поэтому на сайте никогда не бывает ссылок на несуществующие картинки.
 * Пути записаны от корня public/ — здесь к ним добавляется basePath для GitHub Pages.
 */
const photo = (p: Photo | null): Photo | null => (p ? { ...p, src: withBasePath(p.src) } : null);

/** Фото первого экрана: public/main-page.(png|jpg|webp) или public/hero/main-page.* */
export const heroPhoto = photo(raw.hero);
/** Логотип public/logo.(png|webp), если он есть. Иначе используется нарисованный знак-тұмар. */
export const logoImage = photo(raw.logo);
/** Фотографии из public/gallery. */
export const galleryPhotos: Photo[] = raw.gallery.map((p) => ({ ...p, src: withBasePath(p.src) }));
/** Файлы из public/documents. */
export const localDocuments: LocalDocument[] = raw.documents.map((d) => ({ ...d, src: withBasePath(d.src) }));
