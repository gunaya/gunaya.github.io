import photos from '../generated/photos/index.js';
import { photoRuns } from '../data/portfolio.js';

const byName = new Map(photos.map((photo) => [photo.filename, photo]));

export const sheetPhotos = photoRuns.flatMap((run) => run.files.map((file) => byName.get(file)).filter(Boolean));

export const breakPhotos = ['DSC05476.jpg', 'DSCF0797.JPG', 'DSC06157.jpg']
	.map((file) => byName.get(file))
	.filter(Boolean);
