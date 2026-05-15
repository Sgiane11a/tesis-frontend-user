export const inferTypeFromUrl = (url = '') => {
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.ppt') || lower.endsWith('.pptx')) return 'ppt';
  if (lower.endsWith('.doc') || lower.endsWith('.docx')) return 'word';
  if (lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.avi') || lower.endsWith('.mkv')) return 'video';
  return 'link';
};

export const toYouTubeEmbedUrl = (url = '') => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
  } catch {
    return url;
  }

  return url;
};

export const getOfficeEmbedUrl = (url = '') =>
  `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;

export const buildViewerConfig = (resource) => {
  if (!resource?.url) return null;

  if (resource.tipo === 'youtube') {
    return { kind: 'iframe', src: toYouTubeEmbedUrl(resource.url) };
  }

  if (resource.tipo === 'video') {
    return { kind: 'video', src: resource.url };
  }

  if (resource.tipo === 'pdf') {
    return { kind: 'iframe', src: resource.url };
  }

  if (resource.tipo === 'ppt' || resource.tipo === 'word') {
    const isLocal = /localhost|127\.0\.0\.1/.test(resource.url);
    return isLocal
      ? { kind: 'local-office', src: resource.url }
      : { kind: 'iframe', src: getOfficeEmbedUrl(resource.url) };
  }

  return { kind: 'iframe', src: resource.url };
};

export const sortModulesById = (modules = []) =>
  [...modules].sort((a, b) => (a.id_modulo || 0) - (b.id_modulo || 0));

export const buildInitialModuleForm = (bimestre) => ({
  open: false,
  id_bimestre: Number(bimestre) || 1,
  titulo: '',
  descripcion: '',
  visible: false,
  saving: false,
});

export const initialResourceForm = {
  open: false,
  module: null,
  titulo: '',
  sourceType: 'file',
  file: null,
  url: '',
  visible: false,
  saving: false,
};

export const initialConfirmDialog = {
  open: false,
  title: '',
  description: '',
  saving: false,
  onConfirm: null,
};

export const initialFeedbackDialog = {
  open: false,
  title: '',
  description: '',
  tone: 'success',
};

export const initialEditModuleForm = {
  open: false,
  id: null,
  titulo: '',
  descripcion: '',
  saving: false,
};

export const initialEditResourceForm = {
  open: false,
  id: null,
  titulo: '',
  saving: false,
};
